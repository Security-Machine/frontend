import { FC, ReactNode, useCallback, useEffect, useReducer, useRef } from "react";
import {
    OnSignIn, OnSignOut, OnTokenError, LogInTokenAP, SignUpTokenAP,
    TokenData,
    AccessPoint,
} from "@secma/base";
import { useIntl } from "react-intl";
import { DateTime } from "luxon";

import { SecMaContext, SecMaContextProvider } from "./context";
import { SecMaState, initialUserState, secMaReducer } from "./state";
import { useSecMaAppContext } from "../app-controller";
import { jwtDecode } from "jwt-decode";


// The content the token.
type TokenReply = Omit<TokenData, "token">;


/**
 * Save the token to the local storage.
 *
 * @param token The token to save.
 * @param key The key under which to save the token.
 */
const saveTokenToLocalStorage = (token: string, key?: string) => {
    if (!key) return;
    try {
        localStorage.setItem(`${key}-token`, token);
        console.log(
            "[SecMaController] token saved to local storage"
        );
    } catch (e) {
        console.log(
            "[SecMaController] local storage not available," +
            " token not saved"
        );
    }
}


/**
 * Remove the token from the local storage.
 *
 * @param key The key under which the token was saved.
 */
const removeTokenFromLocalStorage = (key?: string) => {
    if (!key) return;
    try {
        localStorage.removeItem(`${key}-token`);
        console.log(
            "[SecMaController] token removed from local storage"
        );
    } catch (e) {
        console.log(
            "[SecMaController] local storage not available, token not removed"
        );
    }
}


/**
 * Try to retrieve the token from the local storage.
 *
 * @param key The key under which the token was saved.
 * @returns The token or undefined if it was not found.
 */
function getTokenFromLocalStorage(key?: string): (string | undefined) {
    if (!key) return undefined;
    try {
        const result = localStorage.getItem(`${key}-token`);
        console.log("[SecMaController] token retrieved from local storage");
        return result || undefined;
    } catch (e) {
        console.log("[SecMaController] local storage not available");
        return undefined;
    }
}



/**
 * Properties expected by the {@link SecMaController}.
 */
export interface SecMaControllerProps {

    /**
     * The callback used for showing errors.
     */
    onError?: OnTokenError;

    /**
     * The callback triggered when an user was signed in.
     */
    onSignIn?: OnSignIn;

    /**
     * The callback triggered when an user was signed out.
     */
    onSignOut?: OnSignOut;

    /**
     * The timeout for the token request.
     */
    timeout?: number;

    /**
     * The slug of the application where the user belong.
     */
    appSlug: string;

    /**
     * The slug of the tenant where the user belong.
     */
    tenantSlug: string;

    /**
     * If not empty, the controller will try to retrieve the token from
     * the local storage and will save it there when it is retrieved from
     * the API.
     *
     * The token is saved under a key that is the concatenation of this
     * string and the string `-token`.
     */
    withLocalStorage?: string;


    /**
     * What to render inside the controller.
     */
    children: ReactNode;
}


/**
 * The controller that manages current user state for its children.
 *
 * The controller can optionally be configured to save the token to the
 * local storage and retrieve it from there on first render.
 *
 * The controller will automatically sign out the user when the token
 * expires.
 *
 * TODO: Add a way to refresh the token.
 */
export const SecMaController: FC<SecMaControllerProps> = ({
    onError = undefined,
    onSignIn = undefined,
    onSignOut = undefined,
    timeout = 10000,
    withLocalStorage = undefined,
    appSlug,
    tenantSlug,
    children
}) => {

    // We want to prevent the control from going into a signed-out state
    // then into a signed in state when there is a token in the local storage.
    // So we use this guard that is empty only on first render.
    const firstRender = useRef(true);
    let localInitialStates: SecMaState = undefined as any;
    if (firstRender.current) {
        localInitialStates = {
            ...initialUserState
        };
        if (withLocalStorage) {
            // Try to retrieve the token from the local storage.
            // If local storage is not available the call will throw an error.
            const token = getTokenFromLocalStorage(withLocalStorage);
            if (token) {
                // Decode it.
                const tokenData = jwtDecode<TokenReply>(token);
                console.log(
                    "[SecMaController] tokenData from local storage %O",
                    tokenData
                );

                // Check if it is expired.
                const now = DateTime.utc();
                const expires = DateTime.fromSeconds(
                    tokenData.exp,
                    { zone: "utc" }
                );
                if (expires.diff(now).as("seconds") <= 0) {
                    // The token is expired.
                    console.log(
                        "[SecMaController] local storage token has expired"
                    );
                } else {
                    // Make sure that the code here is kept in sync with the
                    // `sign-in` action in the reducer.
                    localInitialStates.user_name = tokenData.sub;
                    localInitialStates.expires = tokenData.exp;
                    localInitialStates.permissions = tokenData.scopes;
                    localInitialStates.token = token;
                }
            }
        }
    }

    // The timer ID for the token expiration.
    const timeoutId = useRef<number | undefined>(undefined);

    // Set the base for the API call.
    const { apiUrl } = useSecMaAppContext();
    AccessPoint.apiUrl = apiUrl;

    // Translation provider.
    const intl = useIntl();

    // The persistent state of the map.
    const [state, dispatch] = useReducer(secMaReducer, localInitialStates);


    // The sign in function.
    const signIn = useCallback(async (
        email: string, password: string, isExisting: boolean,
    ) => {
        // Call the API, retrieve the token.
        const Cls = isExisting ? LogInTokenAP : SignUpTokenAP;
        const result = await Cls.i.call(
            undefined as any, // user (not used in this case)
            intl,
            {
                username: email,
                password,
            }, // payload
            {
                app: appSlug,
                tenant: tenantSlug,
            }, // pathArgs
            undefined, // headers
            timeout,
        );
        console.log("[SecMaController] api result %O", result);

        if ("code" in result) {
            // This is an error.
            onError?.(result);
        } else {
            // The token was retrieved.
            dispatch({
                type: "sign-in",
                payload: result as TokenData,
            });
            onSignIn?.(result as TokenData);
        }

        return result;
    }, [timeout, onError, onSignIn, appSlug, tenantSlug, intl]);


    // The sign out function.
    const signOut = useCallback((omitStorage?: boolean) => {
        if (!state.user_name) {
            console.log("[SecMaController] The user is already signed out.");
            return;
        }

        // Update internal state.
        dispatch({ type: "clear" });
        // Inform the parent.
        onSignOut?.({
            token: state.token!,
            sub: state.user_name!,
            exp: state.expires!,
            scopes: state.permissions!,
        });
        // Remove the token from the local storage.
        if (!omitStorage) {
            removeTokenFromLocalStorage(withLocalStorage);
        }
    }, [
        onSignOut, withLocalStorage, state.user_name,
        state.token, state.expires, state.permissions
    ]);


    // Effect run when the token changes.
    useEffect(() => {
        if (state.token) {

            // Save the token to the local storage.
            saveTokenToLocalStorage(state.token, withLocalStorage);

            // Compute the time until the token expires.
            const now = DateTime.utc();
            const expires = DateTime.fromSeconds(
                state.expires, { zone: "utc" }
            );
            let timeout = expires.diff(now).as("milliseconds");
            if (timeout < 0) {
                // The token is expired.
                console.log("[SecMaController] token has expired");
                signOut();
                return;
            }
            timeout = timeout - 1000; // 1 second before the actual expiration.

            // Clear previous timeout.
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }

            // Setup the timeout.
            timeoutId.current = setTimeout(() => {
                console.log("[SecMaController] token has expired");
                signOut();
            }, timeout) as any;

        }
    }, [state.token, state.expires, withLocalStorage, signOut]);


    // On unmount clear the timeout.
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key !== `${withLocalStorage}-token`) return;

            if (e.newValue === null) {
                // The token was removed from the local storage.
                signOut(true);
                console.log(
                    "[SecMaController] signed out in another tab/window",
                );
            } else {
                // The token was added to the local storage.
                const tokenData = jwtDecode<TokenReply>(e.newValue);
                console.log(
                    "[SecMaController] tokenData from local storage %O",
                    tokenData
                );

                // Check if it is expired.
                const now = DateTime.utc();
                const expires = DateTime.fromSeconds(
                    tokenData.exp,
                    { zone: "utc" }
                );
                if (expires.diff(now).as("seconds") <= 0) {
                    // The token is expired.
                    console.log(
                        "[SecMaController] local storage token has expired"
                    );
                } else {
                    // Make sure that the code here is kept in sync with
                    // the `sign-in` action in the reducer.
                    dispatch({
                        type: "sign-in",
                        payload: {
                            token: e.newValue,
                            sub: tokenData.sub,
                            exp: tokenData.exp,
                            scopes: tokenData.scopes,
                        }
                    });
                }
            }
        }
        window.addEventListener("storage", onStorage);

        return () => {
            // Remove the event listener.
            window.removeEventListener("storage", onStorage);
        };
    }, [withLocalStorage, signOut]);


    // On unmount clear the timeout.
    useEffect(() => {
        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        }
    }, []);

    // Compute the value that will be provided through the context.
    const value: SecMaContext = {
        ...state,
        signIn,
        signOut,
    };

    // Make sure to set the guard.
    firstRender.current = false;
    return (
        <SecMaContextProvider value={value}>
            {children}
        </SecMaContextProvider>
    );
};

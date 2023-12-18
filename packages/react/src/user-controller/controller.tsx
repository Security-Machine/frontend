import { FC, ReactNode, useCallback, useReducer } from "react";
import {
    OnSignIn, OnSignOut, OnTokenError, LogInTokenAP, SignUpTokenAP,
    TokenData,
    AccessPoint
} from "@secma/base";
import { useIntl } from "react-intl";

import { SecMaContext, SecMaContextProvider } from "./context";
import { initialUserState, secMaReducer } from "./state";
import { useSecMaAppContext } from "../app-controller";


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
     * What to render inside the controller.
     */
    children: ReactNode;
}


/**
 * The controller that manages current user state for its children.
 */
export const SecMaController: FC<SecMaControllerProps> = ({
    onError = undefined,
    onSignIn = undefined,
    onSignOut = undefined,
    timeout = 10000,
    appSlug,
    tenantSlug,
    children
}) => {
    // Set the base for the API call.
    const { apiUrl } = useSecMaAppContext();
    AccessPoint.apiUrl = apiUrl;
    
    // Translation provider.
    const intl = useIntl();

    // The persistent state of the map.
    const [state, dispatch] = useReducer(secMaReducer, initialUserState);

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
    }, [timeout, onError, onSignIn, appSlug, tenantSlug]);

    // The sign out function.
    const signOut = useCallback(() => {
        if (state.user_name) {
            // Update internal state.
            dispatch({ type: "clear" });
            // Inform the parent.
            onSignOut?.({
                token: state.token!,
                sub: state.user_name!,
                exp: state.expires!,
                scopes: state.permissions!,
            });
        }
    }, [onSignOut, state]);

    // Compute the value that will be provided through the context.
    const value: SecMaContext = {
        ...state,
        signIn,
        signOut,
    };

    return (
        <SecMaContextProvider value={value}>
            {children}
        </SecMaContextProvider>
    );
};

import { FC, ReactNode, useCallback, useReducer } from "react";

import { SecMaContext, SecMaContextProvider } from "./context";
import { initialUserState, secMaReducer } from "./state";
import { OnTokenError } from "@secma/base";


/**
 * Properties expected by the {@link SecMaController}.
 */
export interface SecMaControllerProps {

    /**
     * The URL of the token endpoint.
     */
    tokenUrl: string;

    /**
     * The callback used for showing errors.
     */
    onError?: OnTokenError;

    /**
     * The timeout for the token request.
     */
    timeout?: number;

    /**
     * What to render inside the controller.
     */
    children: ReactNode;
}


/**
 * The controller that manages current user state for its children.
 */
export const SecMaController: FC<SecMaControllerProps> = ({
    tokenUrl,
    onError = undefined,
    timeout = 10000,
    children
}) => {

    // The persistent state of the map.
    const [state, dispatch] = useReducer(secMaReducer, initialUserState);

    // The sign in function.
    const signIn = useCallback((email: string, password: string) => {
        // TODO: retrieve the token.
        
    }, [timeout, tokenUrl, onError]);

    // The sign out function.
    const signOut = useCallback(() => {
        // Update internal state.
        dispatch({ type: "clear" });
    }, []);

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

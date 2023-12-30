import { createContext, useContext } from "react";
import { RetrieveTokenResult } from "@secma/base";

import { SecMaState } from "./state";


/**
 * The data that is stored in context (usually at top level).
 */
export interface SecMaContext extends SecMaState {

    /**
     * Signs the user in (existing user).
     *
     * @param email The email of the user.
     * @param password The password of the user.
     * @param isExisting Whether the user is an existing user (sign in) or
     *  a new user (sign up).
     */
    signIn: (
        email: string,
        password: string,
        isExisting: boolean,
    ) => RetrieveTokenResult;

    /**
     * Signs the user out.
     */
    signOut: () => void;
};


/**
 * The context of the library.
 */
export const secMaContext = createContext<SecMaContext | null>(null);


/**
 * The provider used to wrap react components to allow them access to
 * user data.
 */
export const SecMaContextProvider = secMaContext.Provider;


/**
 * The hook to use for retrieving all information about a map from within.
 */
export const useSecMaContext = () => {
    const result = useContext(secMaContext);
    if (!result) {
        throw new Error("No SecMaContextProvider found.");
    }
    return result as SecMaContext;
};


/**
 * See if the user is signed in and has requested permissions.
 */
export const useSecMaAuthorized = (perms: string | string[]) => {
    // Allow both single and multiple permissions.
    if (!Array.isArray(perms)) {
        perms = [perms];
    }

    // Get current state.
    const {
        user_name,
        permissions,
    } = useSecMaContext();

    // If the user is not signed in, they are not authorized.
    // If the user is signed in, but does not have the required permissions,
    // they are not authorized.
    console.log("[useSecMaAuthorized] user_name=%O", user_name);
    console.log("[useSecMaAuthorized] needed perms=%O", perms);
    console.log("[useSecMaAuthorized] owned permissions=%O", permissions);
    return (!!user_name && perms.every(p => permissions.includes(p)));
};

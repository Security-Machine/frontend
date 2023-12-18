import { createContext, useContext } from "react";


/**
 * The data that is stored in context.
 */
export interface SecMaAppContext {
    /**
     * The path to the log-in page.
     */
    loginPath: string;

    /**
     * The base url for API calls.
     */
    apiUrl: string;
}


/**
 * The context of the library.
 */
export const secMaAppContext = createContext<SecMaAppContext | null>(null);


/**
 * The provider used to wrap react components to allow them access to
 * user data.
 */
export const SecMaAppContextProvider = secMaAppContext.Provider;


/**
 * The hook to use for retrieving all information about a map from within.
 */
export const useSecMaAppContext = () => {
    return useContext<SecMaAppContext>(
        secMaAppContext as any
    ) as SecMaAppContext;
};

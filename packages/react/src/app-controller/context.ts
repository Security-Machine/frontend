import { createContext, useContext } from "react";


/**
 * The data that is stored in context.
 */
export interface SecMaAppContext {
    /**
     * The path to the log-in page.
     *
     * This value is used to redirect the user to the log-in page if they are
     * not logged in.
     */
    loginPath: string;

    /**
     * The base url for API calls.
     */
    apiUrl: string;

    /**
     * The base url for admin pages.
     *
     * This value is used to compute the final url for admin pages.
     */
    adminPrefix?: string;
}


/**
 * The context of the library.
 */
export const secMaAppContext = createContext<
    Required<SecMaAppContext> | null
>(null);


/**
 * The provider used to wrap react components to allow them access to
 * context data.
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


/**
 * The types of URLs that useAdminUrl can compute.
 */
export type AdminUrlType = "app" | "tenant" | "user" | "role" | "perm";
/**
 * The hook for computing the url for admin pages.
 */
export const useAdminUrl = (
    mode: AdminUrlType, appSlug: string, tenantSlug?: string, unique?: string
) => {
    let { adminPrefix } = useSecMaAppContext();
    if (adminPrefix?.endsWith("/")) {
        adminPrefix = adminPrefix.slice(0, -1);
    }
    switch (mode) {
        case "app":
            return `${adminPrefix}/apps/${appSlug}`;
        case "tenant":
            return `${adminPrefix}/tenants/${appSlug}/${tenantSlug}`;
        case "user":
            return `${adminPrefix}/users/${appSlug}/${tenantSlug}/${unique}`;
        case "role":
            return `${adminPrefix}/roles/${appSlug}/${tenantSlug}/${unique}`;
        case "perm":
            return `${adminPrefix}/perms/${appSlug}/${tenantSlug}/${unique}`;
        default:
            throw new Error(`Invalid admin url type ${mode}`);
    }
}

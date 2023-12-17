
/**
 * Navigation data used to store the previous location and return to it
 * after a redirect.
 */
export interface NavigationData {
    from: {
        pathname: string,
        search?: string,
        hash?: string,
        state: any,
    }
}


/**
 * Create an url from navigation data.
 *
 * @param navigationData Navigation data.
 */
export function navigationDataToUrl({
    from: { pathname, search, hash }
}: NavigationData): string {
    return `${pathname}${search || ""}${hash || ""}`;
}

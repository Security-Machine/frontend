import React, { FC, ReactNode, useEffect } from "react";
import { useSecMaAuthorized, useSecMaContext } from "../user-controller";
import { useLocation, useNavigate } from "react-router-dom";
import { useSecMaAppContext } from "../app-controller";
import { NavigationData } from "./navigation-data";


/**
 * Properties expected by the {@link PageGuard} component.
 */
export interface PageGuardProps {
    /**
     * Permissions needed to access this page.
     */
    permissions: string[];

    /**
     * The element to render when the user is not authorized.
     */
    unauthorized?: ReactNode;

    /**
     * The children rendered inside the page guard if the user is authorized.
     */
    children: ReactNode;
}


/**
 * A component that guards a page from being accessed by unauthorized users.
 */
export const PageGuard: FC<PageGuardProps> = ({
    permissions,
    unauthorized,
    children
}) => {
    console.log('[PageGuard] permissions: %O', permissions);

    // Allow both single and multiple permissions.
    if (!Array.isArray(permissions)) {
        permissions = [permissions];
    }

    // Get current state.
    const { user_name, permissions: userPerms, } = useSecMaContext();
    console.log('[PageGuard] user_name: %O', user_name);
    console.log('[PageGuard] userPerms: %O', userPerms);

    // // If the user is not signed in, they are not authorized.
    // // If the user is signed in, but does not have the required permissions,
    // // they are not authorized.
    // return (!!user_name && perms.every(p => permissions.includes(p)));


    // Obtain current location so we can pass that by to the login page.
    const {
        pathname,
        search,
        hash,
        state,
    } = useLocation();
    console.log('[PageGuard] pathname: %O', pathname);
    console.log('[PageGuard] search: %O', search);
    console.log('[PageGuard] state: %O', state);

    // Get the function for redirection.
    const navigate = useNavigate();

    // Get the login url.
    const {
        loginPath,
    } = useSecMaAppContext();
    console.log('[PageGuard] loginPath: %O', loginPath);

    // If the user is not authorized, redirect to the login page.
    useEffect(() => {
        if (!user_name) {
            console.log('[PageGuard] navigating to login page');
            const savedState: NavigationData = {
                from: {
                    pathname,
                    search,
                    hash,
                    state,
                }
            };
            navigate(
                loginPath || "/", {
                state: savedState
            });
        }
    }, [user_name]);

    if (!user_name) {
        return <></>;
    } else if (!permissions.every(p => userPerms.includes(p))) {
        console.error(
            '[PageGuard] user is not authorized (the page requires %O)',
            permissions
        );
        return <>{unauthorized}</>;
    } else {
        return <>{children}</>;
    }
};


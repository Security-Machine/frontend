import {
    UserCreateAP, UserData, UserDeleteAP, UserDetailsAP,
    UserEditAP, UserInput, UserListAP,
} from "@secma/base";

import { useAPI } from './base';


interface AppAndTenant {
    appSlug: string;
    tenSlug: string;
}

interface AppTenantUser {
    appSlug: string;
    tenSlug: string;
    userSlug: string;
}


/**
 * Hook for retrieving the list of users for an application.
 *
 * @param autoTrigger Whether to trigger the API call automatically.
 */
export const useUserList = (
    appSlug: string,
    tenSlug: string,
    autoTrigger: Readonly<boolean> = true,
    timeout?: number,
) => {
    if (!appSlug && autoTrigger) {
        throw new Error(
            "[useAppDetails] appSlug is required when autoTrigger is true."
        );
    }
    return useAPI<never, AppAndTenant, string[]>(
        UserListAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug }, // pathArgs
        undefined, // headers
        autoTrigger,
        timeout,
    );
};


/**
 * Hook for creating a new user inside an application.
 *
 * @param appSlug The slug of the parent application.
 */
export const useUserCreate = (
    appSlug?: string,
    tenSlug?: string,
    timeout?: number
    ) => {
    return useAPI<UserInput, AppAndTenant, UserData>(
        UserCreateAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug } as any, // pathArgs
        undefined, // headers
        false, // autoTrigger,
        timeout,
    );
};


/**
 * Hook for reading details about an user.
 *
 * @param appSlug The slug of the parent application.
 * @param tenSlug The slug of the parent tenant.
 * @param userSlug The slug of the user to read.
 * @param autoTrigger Whether to trigger the API call automatically.
 * @param timeout The timeout for the API call.
 */
export const useUserDetails = (
    appSlug?: string,
    tenSlug?: string,
    userSlug?: string,
    autoTrigger: Readonly<boolean> = true,
    timeout?: number
) => {
    if ((!appSlug || !tenSlug) && autoTrigger) {
        throw new Error(
            "[useAppDetails] appSlug and tenSlug are required when " +
            "autoTrigger is true."
        );
    }

    return useAPI<never, AppTenantUser, UserData>(
        UserDetailsAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug, userSlug } as any, // pathArgs
        undefined, // headers
        autoTrigger,
        timeout,
    );
};


/**
 * Hook for editing an existing user.
 *
 * @param appSlug The slug of the parent application.
 * @param tenSlug The slug of the parent tenant.
 * @param userSlug The slug of the user to edit.
 * @param timeout The timeout for the API call.
 */
export const useUserEdit = (
    appSlug?: string,
    tenSlug?: string,
    userSlug?: string,
    timeout?: number
) => {
    return useAPI<UserInput, AppTenantUser, UserData>(
        UserEditAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug, userSlug } as any, // pathArgs
        undefined, // headers
        false, // autoTrigger,
        timeout,
    );
};


/**
 * Hook for deleting a user.
 *
 * @param appSlug The slug of the parent application.
 * @param tenSlug The slug of the parent tenant.
 * @param userSlug The slug of the user to delete.
 * @param timeout The timeout for the API call.
 */
export const useUserDelete = (
    appSlug?: string,
    tenSlug?: string,
    userSlug?: string,
    timeout?: number
) => {
    return useAPI<never, AppTenantUser, UserData>(
        UserDeleteAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug, userSlug } as any, // pathArgs
        undefined, // headers
        false, // autoTrigger,
        timeout
    );
};

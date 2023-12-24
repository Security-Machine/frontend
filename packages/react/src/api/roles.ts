import {
    RoleCreateAP, RoleData, RoleDeleteAP, RoleDetailsAP,
    RoleEditAP, RoleInput, RoleListAP,
} from "@secma/base";

import { useAPI } from './base';


interface AppAndTenant {
    appSlug: string;
    tenSlug: string;
}

interface AppTenantRole extends AppAndTenant {
    roleSlug: string;
}


/**
 * Hook for retrieving the list of roles for an application.
 *
 * @param appSlug The slug of the parent application.
 * @param tenSlug The slug of the parent tenant.
 * @param autoTrigger Whether to trigger the API call automatically.
 */
export const useRoleList = (
    appSlug: string,
    tenSlug: string,
    autoTrigger: Readonly<boolean> = true,
    timeout?: number,
) => {
    if ((!appSlug || !tenSlug) && autoTrigger) {
        throw new Error(
            "[useAppDetails] appSlug is required when autoTrigger is true."
        );
    }
    return useAPI<never, AppAndTenant, string[]>(
        RoleListAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug }, // pathArgs
        undefined, // headers
        autoTrigger,
        timeout,
    );
};


/**
 * Hook for creating a new role inside an application.
 *
 * @param appSlug The slug of the parent application.
 * @param tenSlug The slug of the parent tenant.
 */
export const useRoleCreate = (
    appSlug?: string,
    tenSlug?: string,
    timeout?: number
    ) => {
    return useAPI<RoleInput, AppAndTenant, RoleData>(
        RoleCreateAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug } as any, // pathArgs
        undefined, // headers
        false, // autoTrigger,
        timeout,
    );
};


/**
 * Hook for reading details about an role.
 *
 * @param appSlug The slug of the parent application.
 * @param tenSlug The slug of the parent tenant.
 * @param roleSlug The slug of the role to read.
 * @param autoTrigger Whether to trigger the API call automatically.
 * @param timeout The timeout for the API call.
 */
export const useRoleDetails = (
    appSlug?: string,
    tenSlug?: string,
    roleSlug?: string,
    autoTrigger: Readonly<boolean> = true,
    timeout?: number
) => {
    if ((!appSlug || !tenSlug) && autoTrigger) {
        throw new Error(
            "[useAppDetails] appSlug and tenSlug are required when " +
            "autoTrigger is true."
        );
    }

    return useAPI<never, AppTenantRole, RoleData>(
        RoleDetailsAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug, roleSlug } as any, // pathArgs
        undefined, // headers
        autoTrigger,
        timeout,
    );
};


/**
 * Hook for editing an existing role.
 *
 * @param appSlug The slug of the parent application.
 * @param tenSlug The slug of the parent tenant.
 * @param role The slug of the role to edit.
 * @param timeout The timeout for the API call.
 */
export const useRoleEdit = (
    appSlug?: string,
    tenSlug?: string,
    roleSlug?: string,
    timeout?: number
) => {
    return useAPI<RoleInput, AppTenantRole, RoleData>(
        RoleEditAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug, roleSlug } as any, // pathArgs
        undefined, // headers
        false, // autoTrigger,
        timeout,
    );
};


/**
 * Hook for deleting a role.
 *
 * @param appSlug The slug of the parent application.
 * @param tenSlug The slug of the parent tenant.
 * @param roleSlug The slug of the role to delete.
 * @param timeout The timeout for the API call.
 */
export const useRoleDelete = (
    appSlug?: string,
    tenSlug?: string,
    roleSlug?: string,
    timeout?: number
) => {
    return useAPI<never, AppTenantRole, RoleData>(
        RoleDeleteAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug, roleSlug } as any, // pathArgs
        undefined, // headers
        false, // autoTrigger,
        timeout
    );
};

import {
    PermCreateAP, PermData, PermDeleteAP, PermDetailsAP,
    PermEditAP, PermInput, PermListAP,
} from "@secma/base";

import { useAPI } from './base';


interface AppAndTenant {
    appSlug: string;
    tenSlug: string;
}

interface AppTenantPerm extends AppAndTenant {
    permSlug: string;
}


/**
 * Hook for retrieving the list of perms for an application.
 *
 * @param appSlug The slug of the parent application.
 * @param tenSlug The slug of the parent tenant.
 * @param autoTrigger Whether to trigger the API call automatically.
 */
export const usePermList = (
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
        PermListAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug }, // pathArgs
        undefined, // headers
        autoTrigger,
        timeout,
    );
};


/**
 * Hook for creating a new perm inside an application.
 *
 * @param appSlug The slug of the parent application.
 * @param tenSlug The slug of the parent tenant.
 */
export const usePermCreate = (
    appSlug?: string,
    tenSlug?: string,
    timeout?: number
    ) => {
    return useAPI<PermInput, AppAndTenant, PermData>(
        PermCreateAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug } as any, // pathArgs
        undefined, // headers
        false, // autoTrigger,
        timeout,
    );
};


/**
 * Hook for reading details about an perm.
 *
 * @param appSlug The slug of the parent application.
 * @param tenSlug The slug of the parent tenant.
 * @param permSlug The slug of the perm to read.
 * @param autoTrigger Whether to trigger the API call automatically.
 * @param timeout The timeout for the API call.
 */
export const usePermDetails = (
    appSlug?: string,
    tenSlug?: string,
    permSlug?: string,
    autoTrigger: Readonly<boolean> = true,
    timeout?: number
) => {
    if ((!appSlug || !tenSlug) && autoTrigger) {
        throw new Error(
            "[useAppDetails] appSlug and tenSlug are required when " +
            "autoTrigger is true."
        );
    }

    return useAPI<never, AppTenantPerm, PermData>(
        PermDetailsAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug, permSlug } as any, // pathArgs
        undefined, // headers
        autoTrigger,
        timeout,
    );
};


/**
 * Hook for editing an existing perm.
 *
 * @param appSlug The slug of the parent application.
 * @param tenSlug The slug of the parent tenant.
 * @param perm The slug of the perm to edit.
 * @param timeout The timeout for the API call.
 */
export const usePermEdit = (
    appSlug?: string,
    tenSlug?: string,
    permSlug?: string,
    timeout?: number
) => {
    return useAPI<PermInput, AppTenantPerm, PermData>(
        PermEditAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug, permSlug } as any, // pathArgs
        undefined, // headers
        false, // autoTrigger,
        timeout,
    );
};


/**
 * Hook for deleting a perm.
 *
 * @param appSlug The slug of the parent application.
 * @param tenSlug The slug of the parent tenant.
 * @param permSlug The slug of the perm to delete.
 * @param timeout The timeout for the API call.
 */
export const usePermDelete = (
    appSlug?: string,
    tenSlug?: string,
    permSlug?: string,
    timeout?: number
) => {
    return useAPI<never, AppTenantPerm, PermData>(
        PermDeleteAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug, permSlug } as any, // pathArgs
        undefined, // headers
        false, // autoTrigger,
        timeout
    );
};

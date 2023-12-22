import {
    TenantCreateAP, TenantData, TenantDeleteAP, TenantDetailsAP,
    TenantEditAP, TenantInput, TenantListAP,
} from "@secma/base";

import { useAPI } from './base';


interface AppAndTenant {
    appSlug: string;
    tenSlug: string;
}

interface AppOnly {
    appSlug: string;
}


/**
 * Hook for retrieving the list of tenants for an application.
 *
 * @param autoTrigger Whether to trigger the API call automatically.
 */
export const useTenantList = (
    appSlug: string,
    autoTrigger: Readonly<boolean> = true,
    timeout?: number,
) => {
    if (!appSlug && autoTrigger) {
        throw new Error(
            "[useAppDetails] appSlug is required when autoTrigger is true."
        );
    }
    return useAPI<never, { appSlug: string }, string[]>(
        TenantListAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug }, // pathArgs
        undefined, // headers
        autoTrigger,
        timeout,
    );
};


/**
 * Hook for creating a new tenant inside an application.
 *
 * @param appSlug The slug of the parent application.
 */
export const useTenantCreate = (
    appSlug?: string,
    timeout?: number
    ) => {
    return useAPI<TenantInput, AppOnly, TenantData>(
        TenantCreateAP.i, // accessPoint
        undefined, // apiPayload
        appSlug ? { appSlug } : undefined, // pathArgs
        undefined, // headers
        false, // autoTrigger,
        timeout,
    );
};


/**
 * Hook for reading details about an tenant.
 *
 * @param appSlug The slug of the parent application.
 * @param tenSlug The slug of the tenant to read.
 * @param autoTrigger Whether to trigger the API call automatically.
 * @param timeout The timeout for the API call.
 */
export const useTenantDetails = (
    appSlug?: string,
    tenSlug?: string,
    autoTrigger: Readonly<boolean> = true,
    timeout?: number
) => {
    if ((!appSlug || !tenSlug) && autoTrigger) {
        throw new Error(
            "[useAppDetails] appSlug and tenSlug are required when " +
            "autoTrigger is true."
        );
    }

    return useAPI<never, AppAndTenant, TenantData>(
        TenantDetailsAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug } as any, // pathArgs
        undefined, // headers
        autoTrigger,
        timeout,
    );
};


/**
 * Hook for editing an existing tenant.
 *
 * @param appSlug The slug of the parent application.
 * @param tenSlug The slug of the tenant to edit.
 * @param timeout The timeout for the API call.
 */
export const useTenantEdit = (
    appSlug?: string,
    tenSlug?: string,
    timeout?: number
) => {
    return useAPI<TenantInput, AppAndTenant, TenantData>(
        TenantEditAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug } as any, // pathArgs
        undefined, // headers
        false, // autoTrigger,
        timeout,
    );
};


/**
 * Hook for deleting a tenant.
 *
 * @param appSlug The slug of the parent application.
 * @param tenSlug The slug of the tenant to delete.
 * @param timeout The timeout for the API call.
 */
export const useTenantDelete = (
    appSlug?: string,
    tenSlug?: string,
    timeout?: number
) => {
    return useAPI<never, AppAndTenant, TenantData>(
        TenantDeleteAP.i, // accessPoint
        undefined, // apiPayload
        { appSlug, tenSlug } as any, // pathArgs
        undefined, // headers
        false, // autoTrigger,
        timeout
    );
};

import { AppCreateAP, AppDeleteAP, AppDetailsAP, AppEditAP, AppListAP } from "@secma/base";
import { useAPI } from './base';


/**
 * Hook for retrieving the list of applications.
 *
 * @param autoTrigger Whether to trigger the API call automatically.
 */
export const useAppList = (autoTrigger: Readonly<boolean> = true) => {
    return useAPI(
        AppListAP.i, // accessPoint
        undefined, // apiPayload
        undefined, // pathArgs
        undefined, // headers
        autoTrigger,
    );
};


/**
 * Hook for creating a new application.
 */
export const useAppCreate = () => {
    return useAPI(
        AppCreateAP.i, // accessPoint
        undefined, // apiPayload
        undefined, // pathArgs
        undefined, // headers
        false, // autoTrigger,
    );
};


/**
 * Hook for reading details about an application.
 *
 * @param appSlug The slug of the application to read.
 * @param autoTrigger Whether to trigger the API call automatically.
 */
export const useAppDetails = (
    appSlug?: string,
    autoTrigger: Readonly<boolean> = true
) => {
    if (!appSlug && autoTrigger) {
        throw new Error(
            "[useAppDetails] appSlug is required when autoTrigger is true."
        );
    }

    return useAPI(
        AppDetailsAP.i, // accessPoint
        undefined, // apiPayload
        appSlug ? { slug: appSlug, } : undefined, // pathArgs
        undefined, // headers
        false, // autoTrigger
    );
};


/**
 * Hook for creating a new application.
 */
export const useAppEdit = () => {
    return useAPI(
        AppEditAP.i, // accessPoint
        undefined, // apiPayload
        undefined, // pathArgs
        undefined, // headers
        false, // autoTrigger,
    );
};


/**
 * Hook for deleting an application.
 *
 * @param appSlug The slug of the application to delete.
 */
export const useAppDelete = (appSlug?: string,) => {
    return useAPI(
        AppDeleteAP.i, // accessPoint
        undefined, // apiPayload
        appSlug ? { slug: appSlug, } : undefined, // pathArgs
        undefined, // headers
        false, // autoTrigger,
    );
};

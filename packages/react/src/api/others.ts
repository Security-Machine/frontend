import { StatsAP, VersionAP } from "@secma/base";

import { useAPI } from "./base";


/**
 * Hook for retrieving the server statistics.
 *
 * @param autoTrigger Whether to trigger the API call automatically.
 */
export const useStats = (
    autoTrigger: Readonly<boolean> = true,
    timeout?: number,
) => {
    return useAPI(
        StatsAP.i, // accessPoint
        undefined, // apiPayload
        undefined, // pathArgs
        undefined, // headers
        autoTrigger,
        timeout,
    );
};


/**
 * Hook for retrieving the version of the server and its dependencies.
 *
 * @param autoTrigger Whether to trigger the API call automatically.
 */
export const useVersion = (
    autoTrigger: Readonly<boolean> = true,
    timeout?: number
) => {
    return useAPI(
        VersionAP.i, // accessPoint
        undefined, // apiPayload
        undefined, // pathArgs
        undefined, // headers
        autoTrigger,
        timeout,
    );
};

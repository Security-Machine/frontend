import { useIntl } from "react-intl";
import { AccessPoint, ApiContext } from "@secma/base";
import { useAPI as useApiBase } from "@vebgen/use-api";
import { useSecMaContext } from "../user-controller/context";


/**
 * A hook that can be used to the SecMa API.
 *
 * The `TPayload` type is the type of the payload that is sent to the API.
 * The `TPathArgs` type is the type of the arguments that are passed in the
 * path.
 * The `TResult` type is the type of the result that is returned by the API.
 *
 * @param accessPoint The class instance that describes how combine
 *       the context, payload, path arguments and headers to call the API.
 *       Note that a request that is in progress in this instance will be
 *       cancelled if a new call to the `trigger`()` is made.
 * @param apiPayload The payload to use in an auto-trigger scenario and the
 *       default payload to send to the API if not provided
 *       when calling the `trigger()` function.
 * @param pathArgs The path arguments to use in an auto-trigger scenario and
 *       the default arguments to use with the API if not provided
 *       when calling the `trigger()` function.
 * @param headers The headers to send to the API in an auto-trigger scenario
 *       and the default headers to use with the API if not provided
 *       when calling the `trigger()` function.
 * @param autoTrigger Whether to automatically trigger the API call on first
 *       render.
 * @param timeout The timeout for the API call. Default is 8000 (8 seconds).
 */
export function useAPI<
    TPayload, TPathArgs, TResult
>(
    accessPoint: AccessPoint<TPayload, TPathArgs, TResult>,
    apiPayload?: Readonly<TPayload>,
    pathArgs?: Readonly<TPathArgs>,
    headers?: Readonly<Record<string, string>>,
    autoTrigger?: Readonly<boolean>,
    timeout?: Readonly<number>,
) {
    return useApiBase<TPayload, TPathArgs, TResult, ApiContext>(
        accessPoint,
        {
            user: useSecMaContext(),
            intl: useIntl(),
        },
        apiPayload,
        pathArgs,
        headers,
        autoTrigger,
        timeout,
    );
}

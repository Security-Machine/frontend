import { AccessPoint, AccessPointError } from "@secma/base";
import { useCallback, useReducer } from "react";
import { useSecMaContext } from "../user-controller/context";
import { useIntl } from "react-intl";
import { useSecMaAppContext } from "../app-controller";


/**
 * The internal state of the {@link useAPI} hook.
 */
export interface SecMaApiState<TResult> {
    /**
     * The result of the call.
     */
    result?: TResult;

    /**
     * The error that was produced.
     */
    error?: AccessPointError;

    /**
     * Whether the API call is in progress.
     */
    loading?: boolean;

    /**
     * Whether the API call has been called at least once
     * and either a result or an error were received.
     */
    called?: boolean;

    /**
     * Set after first render. Used to handle the auto-trigger feature.
     */
    autoTriggerGuard?: boolean;
}


/**
 * The result of a call to the {@link useAPI} hook.
 */
export interface SecMaApiResult<
    TPayload, TPathArgs, TResult
> extends SecMaApiState<TResult> {

    /**
     * The function to call the API.
     */
    trigger: (
        apiPayload?: Readonly<TPayload>,
        pathArgs?: Readonly<TPathArgs>,
        headers?: Readonly<Record<string, string>>,
    ) => Promise<AccessPointError | TResult>;

    /**
     * The function to reset the internal state to the pristine state.
     */
    reset: () => void;
}


/**
 * The action to indicate a call is about to be issued.
 */
export interface SetLoadingAction {
    type: "loading";
    payload: boolean;
};


/**
 * The action to set the result
 */
export interface SetResultAction<TResult> {
    type: "result";
    payload: TResult;
};


/**
 * The action for setting the error.
 */
export interface SetErrorAction {
    type: "error";
    payload: AccessPointError;
};


/**
 * The action for setting the error.
 */
export interface ResetAction {
    type: "reset";
};


/**
 * All the actions supported by the reducer.
 */
export type Action<TResult> =
    | ResetAction
    | SetLoadingAction
    | SetResultAction<TResult>
    | SetErrorAction;


// The initial state of the reducer.
const initialState: SecMaApiState<any> = {
    result: undefined,
    error: undefined,
    loading: false,
    called: false,
    autoTriggerGuard: false,
};


/**
 * The reducer for the {@link useAPI} hook.
 */
export function reducer<TResult>(
    state: SecMaApiState<TResult>, action: Action<TResult>
): SecMaApiState<TResult> {
    switch (action.type) {
        case "reset":
            return {
                ...initialState,
            };
        case "loading":
            return {
                ...state,
                loading: action.payload,
                autoTriggerGuard: true,
            };
        case "result":
            return {
                ...state,
                result: action.payload,
                loading: false,
                called: true,
                error: undefined,
            };
        case "error":
            return {
                ...state,
                error: action.payload,
                loading: false,
                called: true,
            };
        default:
            return state;
    }
}


/**
 * A hook that can be used to call the Secma API.
 *
 * @param accessPoint The access point to call.
 * @param apiPayload The payload to send to the API.
 * @param pathArgs The path arguments to use.
 * @param headers The headers to send to the API.
 * @param autoTrigger Whether to automatically trigger the API call.
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
): SecMaApiResult<TPayload, TPathArgs, TResult> {
    console.log("[useAPI] apiPayload %O", apiPayload);
    console.log("[useAPI] pathArgs %O", pathArgs);
    console.log("[useAPI] headers %O", headers);

    // Set the base for the API call.
    const { apiUrl } = useSecMaAppContext();
    AccessPoint.apiUrl = apiUrl;

    // Get the user from context.
    const userState = useSecMaContext();

    // Translation provider.
    const intl = useIntl();

    // Internal state.
    const [state, dispatch] = useReducer(reducer<TResult>, initialState);

    // The function for the user to call the API.
    const trigger = useCallback(async (
        apiPayloadOverride?: Readonly<TPayload>,
        pathArgsOverride?: Readonly<TPathArgs>,
        headersOverride?: Readonly<Record<string, string>>,
    ) => {
        console.log("[useAPI] trigger, state is %O", userState);

        // Indicate the call is in progress.
        dispatch({ type: "loading", payload: true, });

        // Call the API.
        const result = await accessPoint.call(
            userState,
            intl,
            apiPayloadOverride || apiPayload,
            pathArgsOverride || pathArgs,
            headersOverride || headers,
            timeout || 8000,
        );

        // Dispatch the result.
        if ("code" in (result as any)) {
            dispatch({ type: "error", payload: result as AccessPointError });
        } else {
            dispatch({ type: "result", payload: result as TResult });
        }

        return result;
    }, [accessPoint, userState, intl, apiPayload, pathArgs, headers, timeout]);

    // Reset the state of the hook.
    const reset = useCallback(() => { dispatch({ type: "reset", }); }, []);

    // Auto-trigger the API call if requested.
    if (autoTrigger && !state.autoTriggerGuard) {
        trigger();
    }

    // Compose the result.
    console.log("[useAPI] returns %O", userState);
    return {
        ...state,
        trigger,
        reset,
    };
}

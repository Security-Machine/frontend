import { IntlShape, useIntl } from "react-intl";
import { DateTime } from "luxon";

import { AccessPointError } from "../models/errors";


/**
 * The methods accepted by the API.
 */
export type AccessPointMethod = "GET" | "POST" | "PUT" | "DELETE";


/**
 * Base class for all API calls.
 */
export abstract class AccessPoint<TPayload, TPathArgs, TResult> {

    /**
     * The controller that allows the cancellation of the call.
     */
    protected abortController?: AbortController = undefined;

    /**
     * The constructor.
     */
    protected constructor() { }

    /**
     * Tell if this is a mutation or a query.
     */
    abstract get isMutation(): boolean;

    /**
     * The HTTP method to use.
     */
    abstract get method(): AccessPointMethod;

    /**
     * The path toward the access point.
     *
     * It can contain placeholders for parameters in the form of `:name`.
     */
    abstract get pathPattern(): string;

    /**
     * Post-process the result of the call.
     *
     * @param result The json-parsed result of the call.
     */
    processResult(result: any): TResult {
        return result as TResult;
    }

    /**
     * An utility function for the common case of a query that
     * has date of creation and modification.
     */
    processDates(result: any): TResult {
        return {
            ...result,
            created: DateTime.fromISO(result.created),
            modified: DateTime.fromISO(result.modified),
        };
    }

    /**
     * The URL of the access point.
     *
     * It is computed from the abstract path and the arguments.
     *
     * @param args The arguments to use to compute the URL.
     *
     * @returns The URL of the access point.
     */
    url(args?: TPathArgs): string {
        if (!args) {
            args = {} as any;
        }
        return this.pathPattern.replace(/\{[a-zA-Z0-9\\-]+\}/g, (match) => {
            const key = match.substring(1, match.length - 1);
            const value = (args as any)[key];
            if (value === undefined) {
                throw new Error(`Missing value for parameter ${key}`);
            }
            return value;
        });
    }

    /**
     * Call the access point and return a promise with the result.
     */
    async call(
        intl: IntlShape,
        payload?: TPayload,
        pathArgs?: TPathArgs,
        headers?: Record<string, string>
    ): Promise<TResult | AccessPointError> {
        console.log("[AccessPoint.call] payload", payload);
        console.log("[AccessPoint.call] pathArgs", pathArgs);
        console.log("[AccessPoint.call] headers", headers);

        // Cancel the previous call if any.
        if (this.abortController) {
            this.abortController.abort();
            this.abortController = undefined;
            console.log("[AccessPoint.call] Previous call aborted");
        }

        // Create the abort controller.
        this.abortController = new AbortController();

        // Make the request.
        let response: Response;
        try {
            response = await fetch(this.url(pathArgs), {
                method: this.method,
                body: payload === undefined
                    ? payload as any
                    : JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
                signal: this.abortController.signal
            });
            console.log(
                "[AccessPoint.call] the response was retrieved: %O",
                response
            );
        } catch (error) {
            // The request has not reached the server.
            console.error("[AccessPoint.call] call failed: %O", error);
            return {
                status: 0,
                code: 'err-comm',
                message: intl.formatMessage({
                    id: "secma-base.err-comm",
                    defaultMessage: "Could not communicate with the server"
                })
            }
        } finally {
            console.log("[AccessPoint.call] signal cleared");
            this.abortController = undefined;
        };

        // Parse the response.
        let textResponse: string = await response.text();
        console.log("[AccessPoint.call] text reply: %O", textResponse);
        let jsonResponse: Record<string, any>;
        try {
            jsonResponse = JSON.parse(textResponse);
            console.log(
                "[AccessPoint.call] reply parsed to json: %O", jsonResponse
            );
        } catch {
            // The server always returns JSON on success. This is one of the
            // errors that returns plain text like 404.
            console.log("[AccessPoint.call] not JSON");
            return {
                status: response.status,
                code: 'err-other',
                message: textResponse || response.statusText
            }
        }

        // If this is a success, return the result.
        if (response.ok) {
            return this.processResult(jsonResponse);
        }
        console.log("[AccessPoint.call] not OK");

        // These are the validation errors created by FastAPI.
        if (response.status === 422) {
            console.log("[AccessPoint.call] 422");
            return {
                status: 0,
                code: 'err-validation',
                message: intl.formatMessage({
                    id: "secma-base.err-validation",
                    defaultMessage: "Validation error"
                }),
            }
        }

        // These are the errors created by SecMa API.
        if ("code" in jsonResponse) {
            console.log("[AccessPoint.call] standard error");
            const code = jsonResponse["code"];
            return {
                status: response.status,
                code: code,
                message: intl.formatMessage({
                    id: `secma-base.${code}`,
                    defaultMessage: jsonResponse["message"]
                }),
                field: jsonResponse["field"],
                params: jsonResponse["params"]
            }
        }

        // Something else happened.
        console.log("[AccessPoint.call] unknown error");
        return {
            status: 0,
            code: 'err-unknown',
            message: intl.formatMessage({
                id: "secma-base.err-unknown",
                defaultMessage: "Unknown error"
            }),
        }
    }
}


/**
 * Make error messages known to the application.
 *
 * These are error messages that are produced by the API. The
 * code that is send in ErrorResponse.data.code is the id in these
 * messages without the `secma-base.` prefix.
 */
function useAllErrorMessages() {
    const { formatMessage } = useIntl();
    return [

        formatMessage({
            id: "secma-base.duplicate-app",
            defaultMessage: (
                "An application with a `{appSlug}` slug already exists"
            )
        }, {
            appSlug: "some-app"
        }),
        formatMessage({
            id: "secma-base.no-role",
            defaultMessage:
                "No role with a `{roleId}` ID was found withing this tenant"
        }, {
            roleId: "some-role"
        }),
        formatMessage({
            id: "secma-base.no-app",
            defaultMessage:
                "No application with a `{appSlug}` slug was found"
        }, {
            appSlug: "some-app"
        }),
        formatMessage({
            id: "secma-base.no-user",
            defaultMessage:
                "No user with a `{userId}` ID was found withing this tenant"
        }, {
            userId: "some-user"
        }),
        formatMessage({
            id: "secma-base.invalid-credentials",
            defaultMessage: (
                "Could not validate credentials (trace ID: {uniqueId})."
            )
        }, {
            uniqueId: "some-id"
        }),
        formatMessage({
            id: "secma-base.no-permission",
            defaultMessage: (
                "Not enough permissions (trace ID: {uniqueId})."
            )
        }, {
            uniqueId: "some-id"
        }),
    ]
}

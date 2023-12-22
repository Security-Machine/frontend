import { IntlShape, useIntl } from "react-intl";
import { DateTime } from "luxon";

import { AccessPointError } from "../models/errors";
import { SecMaUser } from "../user";


/**
 * The methods accepted by the API.
 */
export type AccessPointMethod = "GET" | "POST" | "PUT" | "DELETE";


/**
 * Base class for all API calls.
 */
export abstract class AccessPoint<TPayload, TPathArgs, TResult> {

    /**
     * The base URL for API calls.
     */
    static apiUrl = process.env["NX_AUTH_URL"];

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
     * Checks if the user is allowed to call this access point.
     */
    abstract isAllowed(user: Readonly<SecMaUser>): boolean;

    /**
     * Post-process the result of the call.
     *
     * @param result The json-parsed result of the call.
     */
    processResult(
        result: any,
        user: Readonly<SecMaUser>,
        intl: Readonly<IntlShape>,
        payload?: Readonly<TPayload>,
        pathArgs?: Readonly<TPathArgs>,
        headers?: Readonly<Record<string, string>>,
    ): TResult {
        console.log(
            "[AccessPoint.processResult] default (no processing)",
            result
        );
        return result as TResult;
    }

    /**
     * An utility function for the common case of a query that
     * has date of creation and modification.
     *
     * @param result The json-parsed result of the call.
     *
     * @returns The result with the dates converted to `DateTime`.
     */
    processDates(result: any): TResult {

        console.log("[AccessPoint.processDates] result", result);
        const c = DateTime.fromISO(result.created);
        console.log(
            "[AccessPoint.processDates] created",
            c, typeof c, c instanceof DateTime
        );
        return {
            ...result,
            created: DateTime.fromISO(result.created),
            updated: DateTime.fromISO(result.updated),
        };
    }

    /**
     * Additional headers to use.
     */
    get additionalHeaders(): Record<string, string> {
        return {};
    }

    /**
     * Create the body of the request.
     *
     * @param payload The payload to send.
     */
    createBody(payload?: Readonly<TPayload>): string | undefined {
        if (payload === undefined) {
            return undefined;
        }
        return JSON.stringify(payload);
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
    url(args?: Readonly<TPathArgs>): string {
        if (!args) {
            args = {} as any;
        }

        let prefix = AccessPoint.apiUrl;
        if (!prefix) {
            throw new Error("The API URL is not set");
        }

        let suffix = this.pathPattern.replace(/\{[a-zA-Z0-9\\-]+\}/g, (match) => {
            const key = match.substring(1, match.length - 1);
            const value = (args as any)[key];
            if (value === undefined) {
                throw new Error(`Missing value for parameter ${key}`);
            }
            return value;
        });
        if (prefix?.endsWith("/")) {
            prefix = prefix.substring(0, prefix.length - 1);
        }
        if (!suffix.startsWith("/")) {
            suffix += "/";
        }
        return prefix + suffix;
    }

    /**
     * Call the access point and return a promise with the result.
     *
     * @param user The user that is making the call.
     * @param intl The internationalization object.
     * @param payload The payload to send.
     * @param pathArgs The arguments to use to compute the URL.
     * @param headers The headers to send.
     * @param timeout The timeout in milliseconds (8 seconds by default). If
     *  timeout is -1, the abort controller is not used.
     * @returns A promise with the result of the call.
     *
     */
    async call(
        user: Readonly<SecMaUser>,
        intl: Readonly<IntlShape>,
        payload?: Readonly<TPayload>,
        pathArgs?: Readonly<TPathArgs>,
        headers?: Readonly<Record<string, string>>,
        timeout?: number
    ): Promise<TResult | AccessPointError> {
        console.log("[AccessPoint.call] payload", payload);
        console.log("[AccessPoint.call] pathArgs", pathArgs);
        console.log("[AccessPoint.call] headers", headers);

        // Cancel the previous call if any.
        if (timeout !== -1 && this.abortController) {
            this.abortController.abort();
            this.abortController = undefined;
            console.log("[AccessPoint.call] Previous call aborted");
        }

        // See if the user is allowed to call this access point.
        if (!this.isAllowed(user)) {
            console.log("[AccessPoint.call] Not allowed");
            return {
                status: 0,
                code: 'err-permission',
                message: intl.formatMessage({
                    id: "secma-base.err-permission",
                    defaultMessage:
                        "You don't have the required permissions to " +
                        "access this resource"
                })
            }
        }

        // Create the abort controller.
        if (timeout !== -1) {
            this.abortController = new AbortController();
            setTimeout(() => {
                if (this.abortController) {
                    this.abortController.abort();
                    this.abortController = undefined;
                    console.log("[AccessPoint.call] Timeout");
                }
            }, timeout || 8000);
        }

        // Compute the body of the request. The call may throw an
        // exception if the payload is invalid.
        const body = this.createBody(payload);

        // Compute the headers to use.
        const finalHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            ...this.additionalHeaders,
            ...headers
        };
        if (user && user.token) {
            finalHeaders['Authorization'] = 'Bearer ' + user.token;
        }

        // Make the request.
        let response: Response;
        try {
            response = await fetch(this.url(pathArgs), {
                method: this.method,
                body,
                headers: finalHeaders,
                signal: this.abortController
                    ? this.abortController.signal
                    : undefined
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
            if (timeout !== -1) {
                this.abortController = undefined;
            }
        };

        // Parse the response.
        const textResponse: string = await response.text();
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
            return this.processResult(
                jsonResponse,
                user,
                intl,
                payload,
                pathArgs,
                finalHeaders,
            );
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
                    defaultMessage: jsonResponse["message"],
                }, jsonResponse["params"]),
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
function useAllErrorMessages() { // eslint-disable-line
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

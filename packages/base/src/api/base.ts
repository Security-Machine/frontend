import { IntlShape, useIntl } from "react-intl";
import { DateTime } from "luxon";
import { AccessPoint as AccessPointBase } from "@vebgen/access-api";

import { AccessPointError } from "../models/errors";
import { SecMaUser } from "../user";


/**
 * The context provided to the API calls.
 */
export interface ApiContext {
    /**
     * The user that is making the call.
     */
    user: Readonly<SecMaUser>;

    /**
     * The internationalization object.
     */
    intl: Readonly<IntlShape>,
}


/**
 * Base class for all API calls.
 */
export abstract class AccessPoint<TPayload, TPathArgs, TResult>
    extends AccessPointBase<TPayload, TPathArgs, TResult, ApiContext> {

    override apiUrl(): string {
        return process.env["NX_AUTH_URL"] as string;
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


    override adjustBuildInError(
        context: ApiContext,
        error: AccessPointError
    ): AccessPointError {
        return {
            ...error,
            message: context.intl.formatMessage({
                id: `secma-base.${error.code}`,
            }),
        };
    }


    override additionalHeaders(context: ApiContext): Record<string, string> {
        const result: Record<string, string> = {};
        if (context.user && context.user.token) {
            result['Authorization'] = 'Bearer ' + context.user.token;
        }
        return result;
    }


    override async processFailure(
        response: any,
        result: any,
        context: ApiContext,
        payload?: Readonly<TPayload>,
        pathArgs?: Readonly<TPathArgs>,
        headers?: Readonly<Record<string, string>>,
    ): Promise<AccessPointError> {

        // These are the validation errors created by FastAPI.
        if (response.status === 422) {
            console.log("[AccessPoint.call] 422");
            return Promise.reject({
                status: 0,
                code: 'err-validation',
                message: context.intl.formatMessage({
                    id: "secma-base.err-validation",
                    defaultMessage: "Validation error"
                }),
            });
        }

        // These are the errors created by SecMa API.
        if ("code" in result) {
            console.log("[AccessPoint.call] standard error");
            const code = result["code"];
            return Promise.reject({
                status: response.status,
                code: code,
                message: context.intl.formatMessage({
                    id: `secma-base.${code}`,
                    defaultMessage: result["message"],
                }, result["params"]),
                field: result["field"],
                params: result["params"]
            });
        }

        // Fallback to the default implementation.
        return super.processFailure(
            response, result, context, payload, pathArgs, headers
        );
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
            id: "secma-base.err-unknown",
            defaultMessage: "Unknown error"
        }),

        formatMessage({
            id: "secma-base.err-comm",
            defaultMessage: "Could not communicate with the server"
        }),

        formatMessage({
            id: "secma-base.err-permission",
            defaultMessage:
                "You don't have the required permissions to " +
                "access this resource"
        }),

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


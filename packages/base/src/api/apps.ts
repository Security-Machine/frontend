import { AccessPointMethod } from "@vebgen/access-api";

import { ApplicationData, ApplicationInput } from "../models/apps";
import { AccessPoint, ApiContext } from "./base";


/**
 * The permissions required for reading all application slugs.
 */
export const managementAppListPermission = 'apps:r';

/**
 * The permission needed for creating an application.
 */
export const managementAppCreatePermission = 'app:c';

/**
 * The permission needed for viewing details about an application.
 */
export const managementAppReadPermission = 'app:r';

/**
 * The permission needed for editing an application.
 */
export const managementAppEditPermission = 'app:u';

/**
 * The permission needed for deleting an application.
 */
export const managementAppDeletePermission = 'app:d';


/**
 * The access point for the list of applications.
 */
export class AppListAP extends AccessPoint<never, never, string[]> {
    protected static _instance: AppListAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    override method() { return "GET" as AccessPointMethod; }
    override pathPattern() { return "/mng/apps/"; }
    override isAllowed(context: ApiContext) {
        return (
            !!context.user.user_name &&
            context.user.permissions.includes(managementAppListPermission)
        );
    }
}


/**
 * The access point for details about a single application.
 */
export class AppDetailsAP
    extends AccessPoint<never, { slug: string }, ApplicationData> {

    protected static _instance: AppDetailsAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    override method() { return "GET" as AccessPointMethod; }
    override pathPattern() { return "/mng/apps/{slug}"; }
    override isAllowed(context: ApiContext) {
        return (
            !!context.user.user_name &&
            context.user.permissions.includes(managementAppReadPermission)
        );
    }
    override processResult(result: any) {
        console.log("[AppDetailsAP.processResult]", result)
        return Promise.resolve(this.processDates(result));
    }
}


/**
 * The access point for creating a new application.
 */
export class AppCreateAP
    extends AccessPoint<ApplicationInput, never, ApplicationData> {

    protected static _instance: AppCreateAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    override method() { return "PUT" as AccessPointMethod; }
    override pathPattern() { return "/mng/apps/"; }
    override isAllowed(context: ApiContext) {
        return (
            !!context.user.user_name &&
            context.user.permissions.includes(managementAppCreatePermission)
        );
    }
    override processResult(result: any) {
        return Promise.resolve(this.processDates(result));
    }
}


/**
 * The access point for editing an existing application.
 */
export class AppEditAP
    extends AccessPoint<ApplicationInput, { slug: string }, ApplicationData> {

    protected static _instance: AppEditAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    override method() { return "POST" as AccessPointMethod; }
    override pathPattern() { return "/mng/apps/{slug}"; }
    override isAllowed(context: ApiContext) {
        return (
            !!context.user.user_name &&
            context.user.permissions.includes(managementAppEditPermission)
        );
    }
    override processResult(result: any) {
        return Promise.resolve(this.processDates(result));
    }
}


/**
 * The access point for deleting an existing application.
 */
export class AppDeleteAP
    extends AccessPoint<never, { slug: string }, ApplicationData> {

    protected static _instance: AppDeleteAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    override method() { return "DELETE" as AccessPointMethod; }
    override pathPattern() { return "/mng/apps/{slug}"; }
    override isAllowed(context: ApiContext) {
        return (
            !!context.user.user_name &&
            context.user.permissions.includes(managementAppDeletePermission)
        );
    }
    override processResult(result: any) {
        return Promise.resolve(this.processDates(result));
    }
}

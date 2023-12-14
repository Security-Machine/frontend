import { DateTime } from "luxon";

import { ApplicationData, ApplicationInput } from "../models/apps";
import { AccessPoint, AccessPointMethod } from "./base";


/**
 * The access point for the list of applications.
 */
export class AppListAP extends AccessPoint<never, never, string[]> {
    protected static _instance: AppListAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    protected constructor() { super(); }
    get isMutation() { return false; }
    get method() { return "GET" as AccessPointMethod; }
    get pathPattern() { return "/api/apps/"; }
}


/**
 * The access point for details about a single application.
 */
export class AppDetailsAP
    extends AccessPoint<never, { slug: string }, ApplicationData> {

    protected static _instance: AppDetailsAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return false; }
    get method() { return "GET" as AccessPointMethod; }
    get pathPattern() { return "/api/apps/{slug}"; }
    override processResult(result: any): ApplicationData {
        return this.processDates(result);
    }
}



/**
 * The access point for creating a new application.
 */
export class AppCreateAP
    extends AccessPoint<ApplicationInput, never, ApplicationData> {

    protected static _instance: AppCreateAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return true; }
    get method() { return "PUT" as AccessPointMethod; }
    get pathPattern() { return "/api/apps/"; }
    override processResult(result: any): ApplicationData {
        return this.processDates(result);
    }
}


/**
 * The access point for editing an existing application.
 */
export class AppEditAP
    extends AccessPoint<ApplicationInput, { slug: string }, ApplicationData> {

    protected static _instance: AppEditAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return true; }
    get method() { return "POST" as AccessPointMethod; }
    get pathPattern() { return "/api/apps/{slug}"; }
    override processResult(result: any): ApplicationData {
        return this.processDates(result);
    }
}


/**
 * The access point for deleting an existing application.
 */
export class AppDeleteAP
    extends AccessPoint<never, { slug: string }, void> {

    protected static _instance: AppDeleteAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return true; }
    get method() { return "DELETE" as AccessPointMethod; }
    get pathPattern() { return "/api/apps/{slug}"; }
}

import { AccessPointMethod } from "@vebgen/access-api";
import { StatsData, VersionData } from "../models/others";
import { AccessPoint, ApiContext } from "./base";


/**
 * The permissions required for reading server statistics.
 */
export const managementStatsPermission = 'stats:r';

/**
 * The permission needed for retrieving the server version.
 */
export const managementVersionPermission = 'version:r';


/**
 * The access point for retrieving statistics about the server.
 */
export class StatsAP extends AccessPoint<never, never, StatsData> {
    protected static _instance: StatsAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    protected constructor() { super(); }
    override method() { return "GET" as AccessPointMethod; }
    override pathPattern() { return "/mng/stats"; }
    override isAllowed(context: ApiContext) {
        return (
            !!context.user.user_name &&
            context.user.permissions.includes(managementStatsPermission)
        );
    }
}


/**
 * The access point for retrieving the versions of the server and of its
 * dependencies.
 */
export class VersionAP extends AccessPoint<never, never, VersionData> {
    protected static _instance: VersionAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    protected constructor() { super(); }
    override method() { return "GET" as AccessPointMethod; }
    override pathPattern() { return "/mng/version"; }
    override isAllowed(context: ApiContext) {
        return (
            !!context.user.user_name &&
            context.user.permissions.includes(managementVersionPermission)
        );
    }
}

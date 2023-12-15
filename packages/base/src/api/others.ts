import { StatsData, VersionData } from "../models/others";
import { SecMaUser } from "../user";
import { AccessPoint, AccessPointMethod } from "./base";


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
    get isMutation() { return false; }
    get method() { return "GET" as AccessPointMethod; }
    get pathPattern() { return "/mng/stats"; }
    override isAllowed(user: Readonly<SecMaUser>) {
        return (
            !!user.user_name &&
            user.permissions.includes(managementStatsPermission)
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
    get isMutation() { return false; }
    get method() { return "GET" as AccessPointMethod; }
    get pathPattern() { return "/mng/version"; }
    override isAllowed(user: Readonly<SecMaUser>) {
        return (
            !!user.user_name &&
            user.permissions.includes(managementVersionPermission)
        );
    }
}

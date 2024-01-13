import { AccessPointMethod } from "@vebgen/access-api";

import { AccessPoint, ApiContext } from "./base";
import { PermData, PermInput } from '../models/perms';


interface AppAndTenant {
    appSlug: string;
    tenSlug: string;
}

interface AppTenantPerm {
    appSlug: string;
    tenSlug: string;
    permSlug: string;
}


/**
 * The permissions required for reading all perms.
 */
export const managementPermListPermission = 'perms:r';

/**
 * The permission needed for creating a perm.
 */
export const managementPermCreatePermission = 'perm:c';

/**
 * The permission needed for viewing details about a perm.
 */
export const managementPermReadPermission = 'perm:r';

/**
 * The permission needed for editing a perm.
 */
export const managementPermEditPermission = 'perm:u';

/**
 * The permission needed for deleting a perm.
 */
export const managementPermDeletePermission = 'perm:d';



/**
 * The access point for the list of perms.
 */
export class PermListAP
    extends AccessPoint<never, AppAndTenant, string[]> {
    protected static _instance: PermListAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    override method() { return "GET" as AccessPointMethod; }
    override pathPattern() { return "/perm/{appSlug}/{tenSlug}/"; }
    override isAllowed(context: ApiContext) {
        return (
            !!context.user.user_name &&
            context.user.permissions.includes(managementPermListPermission)
        );
    }
}


/**
 * The access point for details about a single perm.
 */
export class PermDetailsAP
    extends AccessPoint<never, AppTenantPerm, PermData> {

    protected static _instance: PermDetailsAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    override method() { return "GET" as AccessPointMethod; }
    override pathPattern() { return "/perm/{appSlug}/{tenSlug}/{permSlug}"; }
    override isAllowed(context: ApiContext) {
        return (
            !!context.user.user_name &&
            context.user.permissions.includes(managementPermReadPermission)
        );
    }
    override processResult(result: any) {
        return Promise.resolve(this.processDates(result));
    }
}


/**
 * The access point for creating a new perm.
 */
export class PermCreateAP
    extends AccessPoint<PermInput, AppAndTenant, PermData> {

    protected static _instance: PermCreateAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    override method() { return "PUT" as AccessPointMethod; }
    override pathPattern() { return "/perm/{appSlug}/{tenSlug}/"; }
    override isAllowed(context: ApiContext) {
        return (
            !!context.user.user_name &&
            context.user.permissions.includes(managementPermCreatePermission)
        );
    }
    override processResult(result: any) {
        return Promise.resolve(this.processDates(result));
    }
}


/**
 * The access point for editing an existing perm.
 */
export class PermEditAP
    extends AccessPoint<PermInput, AppTenantPerm, PermData> {

    protected static _instance: PermEditAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    override method() { return "POST" as AccessPointMethod; }
    override pathPattern() { return "/perm/{appSlug}/{tenSlug}/{permSlug}"; }
    override isAllowed(context: ApiContext) {
        return (
            !!context.user.user_name &&
            context.user.permissions.includes(managementPermEditPermission)
        );
    }
    override processResult(result: any) {
        return Promise.resolve(this.processDates(result));
    }
}


/**
 * The access point for deleting an existing perm.
 */
export class PermDeleteAP
    extends AccessPoint<never, AppTenantPerm, PermData> {

    protected static _instance: PermDeleteAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    override method() { return "DELETE" as AccessPointMethod; }
    override pathPattern() { return "/perm/{appSlug}/{tenSlug}/{permSlug}"; }
    override isAllowed(context: ApiContext) {
        return (
            !!context.user.user_name &&
            context.user.permissions.includes(managementPermDeletePermission)
        );
    }
    override processResult(result: any) {
        return Promise.resolve(this.processDates(result));
    }
}

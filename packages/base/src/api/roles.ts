import { IntlShape } from "react-intl";

import { AccessPoint, AccessPointMethod } from "./base";
import { RoleData, RoleInput } from '../models/roles';
import { SecMaUser } from "../user";


interface AppAndTenant {
    appSlug: string;
    tenSlug: string;
}

interface AppTenantRole {
    appSlug: string;
    tenSlug: string;
    roleSlug: string;
}


/**
 * The permissions required for reading all roles.
 */
export const managementRoleListPermission = 'roles:r';

/**
 * The permission needed for creating a role.
 */
export const managementRoleCreatePermission = 'role:c';

/**
 * The permission needed for viewing details about a role.
 */
export const managementRoleReadPermission = 'role:r';

/**
 * The permission needed for editing a role.
 */
export const managementRoleEditPermission = 'role:u';

/**
 * The permission needed for deleting a role.
 */
export const managementRoleDeletePermission = 'role:d';



/**
 * The access point for the list of roles.
 */
export class RoleListAP
    extends AccessPoint<never, AppAndTenant, string[]> {
    protected static _instance: RoleListAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return false; }
    get method() { return "GET" as AccessPointMethod; }
    get pathPattern() { return "/roles/{appSlug}/{tenSlug}/"; }
    override isAllowed(user: Readonly<SecMaUser>) {
        return (
            !!user.user_name &&
            user.permissions.includes(managementRoleListPermission)
        );
    }
}


/**
 * The access point for details about a single role.
 */
export class RoleDetailsAP
    extends AccessPoint<never, AppTenantRole, RoleData> {

    protected static _instance: RoleDetailsAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return false; }
    get method() { return "GET" as AccessPointMethod; }
    get pathPattern() { return "/roles/{appSlug}/{tenSlug}/{roleSlug}"; }
    override isAllowed(user: Readonly<SecMaUser>) {
        return (
            !!user.user_name &&
            user.permissions.includes(managementRoleReadPermission)
        );
    }
    override processResult(
        result: any,
        role: Readonly<SecMaUser>,
        intl: Readonly<IntlShape>,
        payload?: never,
        pathArgs?: Readonly<AppTenantRole>,
    ): RoleData {
        return this.processDates(result);
    }
}


/**
 * The access point for creating a new role.
 */
export class RoleCreateAP
    extends AccessPoint<RoleInput, AppAndTenant, RoleData> {

    protected static _instance: RoleCreateAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return true; }
    get method() { return "PUT" as AccessPointMethod; }
    get pathPattern() { return "/roles/{appSlug}"; }
    override isAllowed(user: Readonly<SecMaUser>) {
        return (
            !!user.user_name &&
            user.permissions.includes(managementRoleCreatePermission)
        );
    }
    override processResult(
        result: any,
        role: Readonly<SecMaUser>,
        intl: Readonly<IntlShape>,
        payload?: never,
        pathArgs?: Readonly<AppAndTenant>,
    ): RoleData {
        return this.processDates(result);
    }
}


/**
 * The access point for editing an existing role.
 */
export class RoleEditAP
    extends AccessPoint<RoleInput, AppTenantRole, RoleData> {

    protected static _instance: RoleEditAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return true; }
    get method() { return "POST" as AccessPointMethod; }
    get pathPattern() { return "/roles/{appSlug}/{tenSlug}/{roleSlug}"; }
    override isAllowed(user: Readonly<SecMaUser>) {
        return (
            !!user.user_name &&
            user.permissions.includes(managementRoleEditPermission)
        );
    }
    override processResult(
        result: any,
        role: Readonly<SecMaUser>,
        intl: Readonly<IntlShape>,
        payload?: never,
        pathArgs?: Readonly<AppTenantRole>,
    ): RoleData {
        return this.processDates(result);
    }
}


/**
 * The access point for deleting an existing role.
 */
export class RoleDeleteAP
    extends AccessPoint<never, AppTenantRole, RoleData> {

    protected static _instance: RoleDeleteAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return true; }
    get method() { return "DELETE" as AccessPointMethod; }
    get pathPattern() { return "/roles/{appSlug}/{tenSlug}"; }
    override isAllowed(user: Readonly<SecMaUser>) {
        return (
            !!user.user_name &&
            user.permissions.includes(managementRoleDeletePermission)
        );
    }
    override processResult(
        result: any,
        role: Readonly<SecMaUser>,
        intl: Readonly<IntlShape>,
        payload?: never,
        pathArgs?: Readonly<AppTenantRole>,
    ): RoleData {
        return this.processDates(result);
    }
}

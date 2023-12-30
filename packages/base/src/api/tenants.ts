import { IntlShape } from "react-intl";

import { TenantData, TenantInput } from "../models/tenants";
import { AccessPoint, AccessPointMethod } from "./base";
import { SecMaUser } from "../user";


interface AppAndTenant {
    appSlug: string;
    tenSlug: string;
}

interface AppOnly {
    appSlug: string;
}


/**
 * The permissions required for reading all tenant slugs.
 */
export const managementTenantListPermission = 'tenants:r';

/**
 * The permission needed for creating a tenant.
 */
export const managementTenantCreatePermission = 'tenant:c';

/**
 * The permission needed for viewing details about a tenant.
 */
export const managementTenantReadPermission = 'tenant:r';

/**
 * The permission needed for editing a tenant.
 */
export const managementTenantEditPermission = 'tenant:u';

/**
 * The permission needed for deleting a tenant.
 */
export const managementTenantDeletePermission = 'tenant:d';



/**
 * The access point for the list of tenants.
 */
export class TenantListAP
    extends AccessPoint<never, AppOnly, string[]> {
    protected static _instance: TenantListAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return false; }
    get method() { return "GET" as AccessPointMethod; }
    get pathPattern() { return "/tenants/{appSlug}/"; }
    override isAllowed(user: Readonly<SecMaUser>) {
        return (
            !!user.user_name &&
            user.permissions.includes(managementTenantListPermission)
        );
    }
}


/**
 * The access point for details about a single tenant.
 */
export class TenantDetailsAP
    extends AccessPoint<never, AppAndTenant, TenantData> {

    protected static _instance: TenantDetailsAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return false; }
    get method() { return "GET" as AccessPointMethod; }
    get pathPattern() { return "/tenants/{appSlug}/{tenSlug}"; }
    override isAllowed(user: Readonly<SecMaUser>) {
        return (
            !!user.user_name &&
            user.permissions.includes(managementTenantReadPermission)
        );
    }
    override processResult(
        result: any,
        user: Readonly<SecMaUser>,
        intl: Readonly<IntlShape>,
        payload?: never,
        pathArgs?: Readonly<AppOnly>,
    ): TenantData {
        return {
            ...this.processDates(result),
            appSlug: pathArgs?.appSlug ?? "",
        };
    }
}


/**
 * The access point for creating a new tenant.
 */
export class TenantCreateAP
    extends AccessPoint<TenantInput, AppOnly, TenantData> {

    protected static _instance: TenantCreateAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return true; }
    get method() { return "PUT" as AccessPointMethod; }
    get pathPattern() { return "/tenants/{appSlug}/"; }
    override isAllowed(user: Readonly<SecMaUser>) {
        return (
            !!user.user_name &&
            user.permissions.includes(managementTenantCreatePermission)
        );
    }
    override processResult(
        result: any,
        user: Readonly<SecMaUser>,
        intl: Readonly<IntlShape>,
        payload?: never,
        pathArgs?: Readonly<AppOnly>,
    ): TenantData {
        return {
            ...this.processDates(result),
            appSlug: pathArgs?.appSlug ?? "",
        };
    }
}


/**
 * The access point for editing an existing tenant.
 */
export class TenantEditAP
    extends AccessPoint<TenantInput, AppAndTenant, TenantData> {

    protected static _instance: TenantEditAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return true; }
    get method() { return "POST" as AccessPointMethod; }
    get pathPattern() { return "/tenants/{appSlug}/{tenSlug}"; }
    override isAllowed(user: Readonly<SecMaUser>) {
        return (
            !!user.user_name &&
            user.permissions.includes(managementTenantEditPermission)
        );
    }
    override processResult(
        result: any,
        user: Readonly<SecMaUser>,
        intl: Readonly<IntlShape>,
        payload?: never,
        pathArgs?: Readonly<AppOnly>,
    ): TenantData {
        return {
            ...this.processDates(result),
            appSlug: pathArgs?.appSlug ?? "",
        };
    }
}


/**
 * The access point for deleting an existing tenant.
 */
export class TenantDeleteAP
    extends AccessPoint<never, AppAndTenant, TenantData> {

    protected static _instance: TenantDeleteAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return true; }
    get method() { return "DELETE" as AccessPointMethod; }
    get pathPattern() { return "/tenants/{appSlug}/{tenSlug}"; }
    override isAllowed(user: Readonly<SecMaUser>) {
        return (
            !!user.user_name &&
            user.permissions.includes(managementTenantDeletePermission)
        );
    }
    override processResult(
        result: any,
        user: Readonly<SecMaUser>,
        intl: Readonly<IntlShape>,
        payload?: never,
        pathArgs?: Readonly<AppOnly>,
    ): TenantData {
        return {
            ...this.processDates(result),
            appSlug: pathArgs?.appSlug ?? "",
        };
    }
}

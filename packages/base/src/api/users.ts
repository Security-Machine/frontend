import { jwtDecode,  } from 'jwt-decode';
import { IntlShape } from "react-intl";

import { TokenData } from "../models";
import { SecMaUser } from "../user";
import { TenantData, TenantInput } from "../models/tenants";
import { AccessPoint, AccessPointMethod } from "./base";
import { UserData, UserInput } from '../models/users';


/**
 * The user needs to provide the application and the tenant.
 */
interface PathArgs {
    app: string;
    tenant: string;
}


/**
 * User credentials.
 */
interface Payload {
    username: string;
    password: string;
}

// The content the token contains.
type TokenReply = Omit<TokenData, "token">;


/**
 * The access point for retrieving a token for an existing user (log-in).
 */
export class LogInTokenAP extends AccessPoint<Payload, PathArgs, TokenData> {
    protected static _instance: LogInTokenAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return false; }
    get method() { return "POST" as AccessPointMethod; }
    get pathPattern() { return "/token/{app}/{tenant}"; }
    override get additionalHeaders() {
        return {
            "Content-Type": "application/x-www-form-urlencoded",
        };
    }
    override isAllowed(user: Readonly<SecMaUser>) { // eslint-disable-line
        return true;
    }
    override processResult(result: any) {
        // Get the token from reply and decode it.
        const token = result["access_token"];
        const decoded: TokenReply = jwtDecode<TokenReply>(token);
        // Shape the reply.
        return {
            token,
            ...decoded,
        }
    }
    override createBody(payload?: Payload): string | undefined {
        if (!payload) throw new Error("[LogInTokenAP] Missing payload");
        const data = new URLSearchParams();
        data.append("username", payload.username);
        data.append("password", payload.password);
        return data as any;
    }
}


/**
 * The access point for retrieving a token for a new user (sign-up).
 */
export class SignUpTokenAP extends LogInTokenAP {
    protected static override _instance: SignUpTokenAP;
    static override get i() {
        return this._instance ?? (this._instance = new this());
    }

    override get isMutation() { return true; }
    override get method() { return "PUT" as AccessPointMethod; }
}


interface AppAndTenant {
    appSlug: string;
    tenSlug: string;
}

interface AppTenantUser {
    appSlug: string;
    tenSlug: string;
    userSlug: string;
}



/**
 * The permissions required for reading all users.
 */
export const managementUserListPermission = 'users:r';

/**
 * The permission needed for creating a user.
 */
export const managementUserCreatePermission = 'user:c';

/**
 * The permission needed for viewing details about a user.
 */
export const managementUserReadPermission = 'user:r';

/**
 * The permission needed for editing a user.
 */
export const managementUserEditPermission = 'user:u';

/**
 * The permission needed for deleting a user.
 */
export const managementUserDeletePermission = 'user:d';



/**
 * The access point for the list of users.
 */
export class UserListAP
    extends AccessPoint<never, AppAndTenant, string[]> {
    protected static _instance: UserListAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return false; }
    get method() { return "GET" as AccessPointMethod; }
    get pathPattern() { return "/users/{appSlug}/{tenSlug}/"; }
    override isAllowed(user: Readonly<SecMaUser>) {
        return (
            !!user.user_name &&
            user.permissions.includes(managementUserListPermission)
        );
    }
}


/**
 * The access point for details about a single user.
 */
export class UserDetailsAP
    extends AccessPoint<never, AppTenantUser, UserData> {

    protected static _instance: UserDetailsAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return false; }
    get method() { return "GET" as AccessPointMethod; }
    get pathPattern() { return "/users/{appSlug}/{tenSlug}/{userSlug}"; }
    override isAllowed(user: Readonly<SecMaUser>) {
        return (
            !!user.user_name &&
            user.permissions.includes(managementUserReadPermission)
        );
    }
    override processResult(
        result: any,
        user: Readonly<SecMaUser>,
        intl: Readonly<IntlShape>,
        payload?: never,
        pathArgs?: Readonly<AppTenantUser>,
    ): UserData {
        return this.processDates(result);
    }
}


/**
 * The access point for creating a new user.
 */
export class UserCreateAP
    extends AccessPoint<UserInput, AppAndTenant, UserData> {

    protected static _instance: UserCreateAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return true; }
    get method() { return "PUT" as AccessPointMethod; }
    get pathPattern() { return "/users/{appSlug}"; }
    override isAllowed(user: Readonly<SecMaUser>) {
        return (
            !!user.user_name &&
            user.permissions.includes(managementUserCreatePermission)
        );
    }
    override processResult(
        result: any,
        user: Readonly<SecMaUser>,
        intl: Readonly<IntlShape>,
        payload?: never,
        pathArgs?: Readonly<AppAndTenant>,
    ): UserData {
        return this.processDates(result);
    }
}


/**
 * The access point for editing an existing user.
 */
export class UserEditAP
    extends AccessPoint<UserInput, AppTenantUser, UserData> {

    protected static _instance: UserEditAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return true; }
    get method() { return "POST" as AccessPointMethod; }
    get pathPattern() { return "/users/{appSlug}/{tenSlug}/{userSlug}"; }
    override isAllowed(user: Readonly<SecMaUser>) {
        return (
            !!user.user_name &&
            user.permissions.includes(managementUserEditPermission)
        );
    }
    override processResult(
        result: any,
        user: Readonly<SecMaUser>,
        intl: Readonly<IntlShape>,
        payload?: never,
        pathArgs?: Readonly<AppTenantUser>,
    ): UserData {
        return this.processDates(result);
    }
}


/**
 * The access point for deleting an existing user.
 */
export class UserDeleteAP
    extends AccessPoint<never, AppTenantUser, UserData> {

    protected static _instance: UserDeleteAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return true; }
    get method() { return "DELETE" as AccessPointMethod; }
    get pathPattern() { return "/users/{appSlug}/{tenSlug}"; }
    override isAllowed(user: Readonly<SecMaUser>) {
        return (
            !!user.user_name &&
            user.permissions.includes(managementUserDeletePermission)
        );
    }
    override processResult(
        result: any,
        user: Readonly<SecMaUser>,
        intl: Readonly<IntlShape>,
        payload?: never,
        pathArgs?: Readonly<AppTenantUser>,
    ): UserData {
        return this.processDates(result);
    }
}

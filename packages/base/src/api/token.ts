import { jwtDecode,  } from 'jwt-decode';

import { TokenData } from "../models";
import { SecMaUser } from "../user";
import { AccessPoint, AccessPointMethod } from "./base";


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
 * The access point for the list of applications.
 */
export class TokenAP extends AccessPoint<Payload, PathArgs, TokenData> {
    protected static _instance: TokenAP;
    static get i() { return this._instance ?? (this._instance = new this()); }

    get isMutation() { return false; }
    get method() { return "POST" as AccessPointMethod; }
    get pathPattern() { return "/token/{app}/{tenant}"; }
    override isAllowed(user: Readonly<SecMaUser>) {
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
        if (!payload) throw new Error("[TokenAP] Missing payload");
        const data = new FormData();
        data.append("username", payload.username);
        data.append("password", payload.password);
        return data as any;
    }
}

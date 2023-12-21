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

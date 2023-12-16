import { AccessPointError } from "./errors";


/**
 * The reply from the token endpoint.
 */
export interface TokenReply {
    /**
     * The access token.
     */
    access_token: string;

    /**
     * The type of the token.
     */
    token_type: "bearer";
};


/**
 * The content of the token.
 */
export interface TokenData {

    /**
     * The encoded token.
     */
    token: string;

    /**
     * The subject (name of the user in this case).
     */
    sub: string;

    /**
     * The expiration time.
     */
    exp: number;

    /**
     * The permissions that this user has.
     */
    scopes: string[];
}


/**
 * The function that is called when the token cannot be retrieved.
 *
 * @param error The error indicating what went wrong.
 */
export type OnTokenError = (error: AccessPointError) => void;


/**
 * The result of the token retrieval.
 *
 * The first element is the token, the second is the decoded content.
 *
 * If the token could not be retrieved, `undefined` is returned; the
 * error handler was already called.
 */
export type RetrieveTokenResult = Promise<TokenData | AccessPointError>;


/**
 * The function that is called when the an user was signed in.
 *
 * @param error The error indicating what went wrong.
 */
export type OnSignIn = (data: TokenData) => void;


/**
 * The function that is called when the an user was signed in.
 *
 * @param data The result from the server.
 */
export type OnSignOut = (data: TokenData) => void;

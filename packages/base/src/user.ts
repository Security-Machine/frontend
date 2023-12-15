/**
 * Information about the current user.
 */
export interface SecMaUser {

    /**
     * The name of the user.
     */
    user_name?: string;

    /**
     * The expiration time of the current token.
     */
    expires: number;

    /**
     * The permissions that this user has.
     */
    permissions: string[];

    /**
     * The token that was used to retrieve the user information.
     */
    token?: string;

};

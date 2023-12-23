import { DateTime } from 'luxon';


/**
 * The data expected by the server.
 */
export interface UserInput {

    /**
     * The unique identifier of the user.
     */
    name: string;

    /**
     * The description of the user.
     */
    description?: string;
}



/**
 * The data provided by the server.
 */
export interface UserData extends UserInput {

    /**
     * The date when the user was created.
     */
    created: DateTime;

    /**
     * The date when the user was last updated.
     */
    updated: DateTime;
}

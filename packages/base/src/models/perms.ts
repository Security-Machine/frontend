import { DateTime } from 'luxon';


/**
 * The data expected by the server.
 */
export interface PermInput {

    /**
     * The unique identifier of the perm.
     */
    name: string;

    /**
     * The description of the perm.
     */
    description?: string;
}



/**
 * The data provided by the server.
 */
export interface PermData extends PermInput {

    /**
     * The date when the perm was created.
     */
    created: DateTime;

    /**
     * The date when the perm was last updated.
     */
    updated: DateTime;
}

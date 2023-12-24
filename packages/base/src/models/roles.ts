import { DateTime } from 'luxon';


/**
 * The data expected by the server.
 */
export interface RoleInput {

    /**
     * The unique identifier of the role.
     */
    name: string;

    /**
     * The description of the role.
     */
    description?: string;
}



/**
 * The data provided by the server.
 */
export interface RoleData extends RoleInput {

    /**
     * The date when the role was created.
     */
    created: DateTime;

    /**
     * The date when the role was last updated.
     */
    updated: DateTime;
}

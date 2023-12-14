import { DateTime } from 'luxon';

/**
 * The data expected by the server.
 */
export interface ApplicationInput {

    /**
     * The unique identifier of the application.
     */
    slug: string;

    /**
     * The name of the application.
     */
    title?: string;

    /**
     * The description of the application.
     */
    description?: string;
}



/**
 * The data provided by the server.
 */
export interface ApplicationData extends ApplicationInput {

    /**
     * The date when the application was created.
     */
    created: DateTime;

    /**
     * The date when the application was last updated.
     */
    updated: DateTime;
}

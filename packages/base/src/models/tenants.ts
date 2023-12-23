import { DateTime } from 'luxon';


/**
 * The data expected by the server.
 */
export interface TenantInput {

    /**
     * The unique identifier of the tenant.
     */
    slug: string;

    /**
     * The name of the tenant.
     */
    title?: string;

    /**
     * The description of the tenant.
     */
    description?: string;
}



/**
 * The data provided by the server.
 */
export interface TenantData extends TenantInput {
    /**
     * The unique identifier of the application.
     */
    appSlug: string;

    /**
     * The date when the tenant was created.
     */
    created: DateTime;

    /**
     * The date when the tenant was last updated.
     */
    updated: DateTime;
}

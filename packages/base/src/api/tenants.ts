import { ApplicationData, ApplicationInput } from "../models/apps";
import { AccessPoint, AccessPointMethod } from "./base";
import { SecMaUser } from "../user";

/**
 * The permissions required for reading all tenant slugs.
 */
export const managementTenantListPermission = 'tenants:r';

/**
 * The permission needed for creating a tenant.
 */
export const managementTenantCreatePermission = 'tenant:c';

/**
 * The permission needed for viewing details about a tenant.
 */
export const managementTenantReadPermission = 'tenant:r';

/**
 * The permission needed for editing a tenant.
 */
export const managementTenantEditPermission = 'tenant:u';

/**
 * The permission needed for deleting a tenant.
 */
export const managementTenantDeletePermission = 'tenant:d';


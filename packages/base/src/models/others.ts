
/**
 * The statistics reported by the server.
 */
export interface StatsData {
    apps: number;
    apps_no_tenants: number;
    tenants: number;
    tenants_no_users: number;
    tenants_no_roles: number;
    tenants_no_perms: number;
    users: number;
    users_no_roles: number;
    roles: number;
    roles_no_perms: number;
    perms: 0
}


/**
 * The versions of the server and its dependencies.
 */
export interface VersionData {
    api: string,
    fastapi: string,
    pydantic: string
}

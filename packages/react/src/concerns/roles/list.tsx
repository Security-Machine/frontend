import { FC, ReactNode, createContext, useContext, useCallback } from "react";
import { useIntl } from "react-intl";
import {
    RoleDetailsAP,
    managementRoleCreatePermission,
    managementRoleDeletePermission,
    managementRoleEditPermission,
    managementRoleReadPermission,
} from "@secma/base";
import { RoleData } from "@secma/base";

import { useRoleList } from "../../api";
import { Use2StageListResult, use2StageList } from "../../lcrud/use-list";
import { useSecMaContext } from "../../user-controller";


/**
 * The data that is stored in context.
 */
export type RoleListContextData = Use2StageListResult<string, RoleData>;


/**
 * The context that stores list data.
 */
export const roleListContext = createContext<
    RoleListContextData | null
>(null);


/**
 * The hook for accessing the list context data.
 */
export const useRoleListContext = () => {
    const value = useContext(roleListContext);
    if (value === null) {
        throw new Error(
            `The context roleListContext is null.`
        );
    }
    return value;
}


/**
 * The provider used to wrap react components to allow them access to
 * context data.
 */
export const RoleListContextProvider = roleListContext.Provider;


/**
 * The properties expected by the (@link RoleListController).
 */
export interface RoleListControllerProps {

    /**
     * The slug of the application where the roles are stored.
     */
    appSlug: string;

    /**
     * The slug of the tenant where the roles are stored.
     */
    tenSlug: string;

    /**
     * The children of the controller.
     */
    children: ReactNode;
}


const createPerms = [managementRoleCreatePermission];
const readPerms = [managementRoleReadPermission];
const updatePerms = [managementRoleEditPermission];
const deletePerms = [managementRoleDeletePermission];
const toKey = (item: any) => item;


/**
 * The controller for a list of roles.
 */
export const RoleListController: FC<RoleListControllerProps> = ({
    appSlug,
    tenSlug,
    children,
}) => {
    // Hook for internationalization.
    const intl = useIntl();

    // Read the role and its permissions from the context.
    const roleContext = useSecMaContext();

    // Prepared call.
    const fetchDetail = useCallback((
        roleSlug: any
    ) => RoleDetailsAP.i.call(
        {
            intl,
            user: roleContext,
        },
        undefined, // payload
        { appSlug, tenSlug, roleSlug }, // pathArgs
        undefined, // headers
        -1, // timeout (-1 without timeout, no controller)
    ), [appSlug, tenSlug, roleContext, intl]);

    // Hook for managing the list of roles.
    const list = use2StageList<
        never, { appSlug: string, tenSlug: string }, string, RoleData
    >({
        createPerms,
        readPerms,
        updatePerms,
        deletePerms,
        useFetchList: () => useRoleList(appSlug, tenSlug),
        fetchDetail,
        toKey,
    });

    return (
        <RoleListContextProvider value={list}>
            {children}
        </RoleListContextProvider>
    );
}

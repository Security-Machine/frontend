import { FC, ReactNode, createContext, useContext, useCallback } from "react";
import { useIntl } from "react-intl";
import {
    TenantDetailsAP,
    managementTenantCreatePermission,
    managementTenantDeletePermission,
    managementTenantEditPermission,
    managementTenantReadPermission,
} from "@secma/base";
import { TenantData } from "@secma/base";

import { useTenantList } from "../../api";
import { Use2StageListResult, use2StageList } from "../../lcrud/use-list";
import { useSecMaContext } from "../../user-controller";


/**
 * The data that is stored in context.
 */
export interface TenantListContextData extends
    Use2StageListResult<string, TenantData> { }


/**
 * The context that stores list data.
 */
export const tenantListContext = createContext<
    TenantListContextData | null
>(null);


/**
 * The hook for accessing the list context data.
 */
export const useTenantListContext = () => {
    const value = useContext(tenantListContext);
    if (value === null) {
        throw new Error(
            `The context tenantListContext is null.`
        );
    }
    return value;
}


/**
 * The provider used to wrap react components to allow them access to
 * context data.
 */
export const TenantListContextProvider = tenantListContext.Provider;


/**
 * The properties expected by the (@link TenantListController).
 */
export interface TenantListControllerProps {

    /**
     * The slug of the application where the tenants are stored.
     */
    appSlug: string;

    /**
     * The children of the controller.
     */
    children: ReactNode;
}


const createPerms = [managementTenantCreatePermission];
const readPerms = [managementTenantReadPermission];
const updatePerms = [managementTenantEditPermission];
const deletePerms = [managementTenantDeletePermission];
const toKey = (item: any) => item;


/**
 * The controller for a list of tenants.
 */
export const TenantListController: FC<TenantListControllerProps> = ({
    appSlug,
    children,
}) => {
    // Hook for internationalization.
    const intl = useIntl();

    // Read the user and its permissions from the context.
    const userContext = useSecMaContext();

    // Prepared call.
    const fetchDetail = useCallback((
        tenSlug: any
    ) => TenantDetailsAP.i.call(
        userContext, // user
        intl,
        undefined, // payload
        { appSlug, tenSlug }, // pathArgs
        undefined, // headers
        -1, // timeout (-1 without timeout, no controller)
    ), [userContext, intl]);

    // Hook for managing the list of tenants.
    const list = use2StageList<
        never, never, string,
        never, { appSlug: string }, TenantData
    >({
        createPerms,
        readPerms,
        updatePerms,
        deletePerms,
        useFetchList: () => useTenantList(appSlug),
        fetchDetail,
        toKey,
    });

    return (
        <TenantListContextProvider value={list}>
            {children}
        </TenantListContextProvider>
    );
}

import { FC, ReactNode, createContext, useContext, useCallback } from "react";
import { useIntl } from "react-intl";
import {
    PermDetailsAP,
    managementPermCreatePermission,
    managementPermDeletePermission,
    managementPermEditPermission,
    managementPermReadPermission,
} from "@secma/base";
import { PermData } from "@secma/base";

import { usePermList } from "../../api";
import { Use2StageListResult, use2StageList } from "../../lcrud/use-list";
import { useSecMaContext } from "../../user-controller";


/**
 * The data that is stored in context.
 */
export type PermListContextData = Use2StageListResult<string, PermData>;


/**
 * The context that stores list data.
 */
export const permListContext = createContext<
    PermListContextData | null
>(null);


/**
 * The hook for accessing the list context data.
 */
export const usePermListContext = () => {
    const value = useContext(permListContext);
    if (value === null) {
        throw new Error(
            `The context permListContext is null.`
        );
    }
    return value;
}


/**
 * The provider used to wrap react components to allow them access to
 * context data.
 */
export const PermListContextProvider = permListContext.Provider;


/**
 * The properties expected by the (@link PermListController).
 */
export interface PermListControllerProps {

    /**
     * The slug of the application where the perms are stored.
     */
    appSlug: string;

    /**
     * The slug of the tenant where the perms are stored.
     */
    tenSlug: string;

    /**
     * The children of the controller.
     */
    children: ReactNode;
}


const createPerms = [managementPermCreatePermission];
const readPerms = [managementPermReadPermission];
const updatePerms = [managementPermEditPermission];
const deletePerms = [managementPermDeletePermission];
const toKey = (item: any) => item;


/**
 * The controller for a list of perms.
 */
export const PermListController: FC<PermListControllerProps> = ({
    appSlug,
    tenSlug,
    children,
}) => {
    // Hook for internationalization.
    const intl = useIntl();

    // Read the perm and its permissions from the context.
    const permContext = useSecMaContext();

    // Prepared call.
    const fetchDetail = useCallback((
        permSlug: any
    ) => PermDetailsAP.i.call(
        {
            intl,
            user: permContext,
        },
        undefined, // payload
        { appSlug, tenSlug, permSlug } as any, // pathArgs
        undefined, // headers
        -1, // timeout (-1 without timeout, no controller)
    ), [appSlug, tenSlug, permContext, intl]);

    // Hook for managing the list of perms.
    const list = use2StageList<
        never, { appSlug: string, tenSlug: string }, string, PermData
    >({
        createPerms,
        readPerms,
        updatePerms,
        deletePerms,
        useFetchList: () => usePermList(appSlug, tenSlug),
        fetchDetail,
        toKey,
    });

    return (
        <PermListContextProvider value={list}>
            {children}
        </PermListContextProvider>
    );
}

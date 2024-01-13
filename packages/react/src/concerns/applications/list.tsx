import { FC, ReactNode, createContext, useContext,  useCallback } from "react";
import { useIntl } from "react-intl";
import {
    AppDetailsAP,
    managementAppCreatePermission,
    managementAppDeletePermission,
    managementAppEditPermission,
    managementAppReadPermission,
} from "@secma/base";
import { ApplicationData } from "@secma/base";

import { useAppList } from "../../api";
import { Use2StageListResult, use2StageList } from "../../lcrud/use-list";
import { useSecMaContext } from "../../user-controller";


/**
 * The data that is stored in context.
 */
export interface AppListContextData extends
    Use2StageListResult<string, ApplicationData> {}


/**
 * The context that stores list data.
 */
export const appListContext = createContext<AppListContextData | null>(null);


/**
 * The hook for accessing the list context data.
 */
export const useAppListContext = () => {
    const value = useContext(appListContext);
    if (value === null) {
        throw new Error(
            `The context appListContext is null.`
        );
    }
    return value;
}


/**
 * The provider used to wrap react components to allow them access to
 * context data.
 */
export const AppListContextProvider = appListContext.Provider;


/**
 * The properties expected by the (@link AppListController).
 */
export interface AppListControllerProps {

    /**
     * The children of the controller.
     */
    children: ReactNode;
}


const createPerms = [managementAppCreatePermission];
const readPerms = [managementAppReadPermission];
const updatePerms = [managementAppEditPermission];
const deletePerms = [managementAppDeletePermission];
const toKey = (item: any) => item;


/**
 * The controller for a list of applications.
 */
export const AppListController: FC<AppListControllerProps> = ({
    children,
}) => {
    // Hook for internationalization.
    const intl = useIntl();

    // Read the user and its permissions from the context.
    const userContext = useSecMaContext();

    // Prepared call.
    const fetchDetail = useCallback((appSlug: any) => AppDetailsAP.i.call(
        {
            user: userContext,
            intl,
        },
        undefined, // payload
        { slug: appSlug }, // pathArgs
        undefined, // headers
        -1, // timeout (-1 without timeout, no controller)
    ), [userContext, intl]);

    // Hook for managing the list of applications.
    const list = use2StageList<
        never, never, string, ApplicationData
    >({
        createPerms,
        readPerms,
        updatePerms,
        deletePerms,
        useFetchList: useAppList,
        fetchDetail,
        toKey,
    });

    return (
        <AppListContextProvider value={list}>
            {children}
        </AppListContextProvider>
    );
}

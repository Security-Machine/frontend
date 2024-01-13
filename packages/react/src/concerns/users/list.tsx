import { FC, ReactNode, createContext, useContext, useCallback } from "react";
import { useIntl } from "react-intl";
import {
    UserDetailsAP,
    managementUserCreatePermission,
    managementUserDeletePermission,
    managementUserEditPermission,
    managementUserReadPermission,
} from "@secma/base";
import { UserData } from "@secma/base";

import { useUserList } from "../../api";
import { Use2StageListResult, use2StageList } from "../../lcrud/use-list";
import { useSecMaContext } from "../../user-controller";


/**
 * The data that is stored in context.
 */
export type UserListContextData = Use2StageListResult<string, UserData>;


/**
 * The context that stores list data.
 */
export const userListContext = createContext<
    UserListContextData | null
>(null);


/**
 * The hook for accessing the list context data.
 */
export const useUserListContext = () => {
    const value = useContext(userListContext);
    if (value === null) {
        throw new Error(
            `The context userListContext is null.`
        );
    }
    return value;
}


/**
 * The provider used to wrap react components to allow them access to
 * context data.
 */
export const UserListContextProvider = userListContext.Provider;


/**
 * The properties expected by the (@link UserListController).
 */
export interface UserListControllerProps {

    /**
     * The slug of the application where the users are stored.
     */
    appSlug: string;

    /**
     * The slug of the tenant where the users are stored.
     */
    tenSlug: string;

    /**
     * The children of the controller.
     */
    children: ReactNode;
}


const createPerms = [managementUserCreatePermission];
const readPerms = [managementUserReadPermission];
const updatePerms = [managementUserEditPermission];
const deletePerms = [managementUserDeletePermission];
const toKey = (item: any) => item;


/**
 * The controller for a list of users.
 */
export const UserListController: FC<UserListControllerProps> = ({
    appSlug,
    tenSlug,
    children,
}) => {
    // Hook for internationalization.
    const intl = useIntl();

    // Read the user and its permissions from the context.
    const userContext = useSecMaContext();

    // Prepared call.
    const fetchDetail = useCallback((
        userSlug: any
    ) => UserDetailsAP.i.call(
        {
            intl,
            user: userContext,
        },
        undefined, // payload
        { appSlug, tenSlug, userSlug }, // pathArgs
        undefined, // headers
        -1, // timeout (-1 without timeout, no controller)
    ), [appSlug, tenSlug, userContext, intl]);

    // Hook for managing the list of users.
    const list = use2StageList<
        never, { appSlug: string, tenSlug: string }, string, UserData
    >({
        createPerms,
        readPerms,
        updatePerms,
        deletePerms,
        useFetchList: () => useUserList(appSlug, tenSlug),
        fetchDetail,
        toKey,
    });
    console.log("[UserListController] list %O", list);

    return (
        <UserListContextProvider value={list}>
            {children}
        </UserListContextProvider>
    );
}

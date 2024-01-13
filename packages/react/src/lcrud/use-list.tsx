import { useCallback, useEffect, useReducer } from "react";
import { AccessPointError, ApiContext } from "@secma/base";

import { useSecMaContext } from "../user-controller";
import { UseApiResult } from "@vebgen/use-api";


/**
 * The unique key of an item in the list.
 */
type ListKey = string | number;


/**
 * The operating mode of the list.
 *
 * Following values are allowed:
 * - `list` - The view should show the list of items and nothing else;
 * - `view` - The view should show the details of the current item;
 * - `edit` - The view should show the details of the current item and allow
 *   editing;
 * - `delete` - The view should show confirmation dialog for deleting the
 *   current item;
 * - `create` - The view should show the form for creating a new item.
 */
type ListMode = "list" | "view" | "edit" | "delete" | "create";


/**
 * The internal state of the `use2StageList` hook.
 */
export interface Use2StageListState<TFast, TDetail> {
    /**
     * The internal data.
     */
    data: Record<ListKey, TFast | TDetail>;

    /**
     * The current item.
     */
    current: ListKey | null;

    /**
     * The current mode.
     *
     * - `list` - The list of items are being shown.
     * - `view` - The current item is being viewed.
     * - `edit` - The current item is being edited.
     * - `delete` - The current item is being deleted.
     */
    mode: ListMode;
}


/**
 * The action for beginning to edit an item.
 */
export type BeginEditAction = {
    type: "beginEdit";
    payload: ListKey;
};


/**
 * The action for beginning to create a new item.
 */
export type BeginCreateAction = {
    type: "beginCreate";
};


/**
 * The action for beginning to delete an item.
 */
export type BeginDeleteAction = {
    type: "beginDelete";
    payload: ListKey;
};


/**
 * The action for setting the current item.
 */
export type SetCurrentAction = {
    type: "setCurrent";
    payload: {
        item: ListKey;
        mode?: ListMode;
    };
};


/**
 * The action for clearing the current item.
 */
export type ClearCurrentAction = {
    type: "clearCurrent";
};


/**
 * The action for setting data retrieved.
 */
export type SetDataAction<TFast, TDetail> = {
    type: "setData";
    payload: Record<ListKey, TFast | TDetail>;
};


/**
 * The action for adding a new item to the data.
 */
export type AddItemAction<TFast, TDetail> = {
    type: "addNewItem";
    payload: {
        unique: ListKey;
        data: TDetail | TFast;
    };
};


/**
 * The action for editing an existing item to the data.
 */
export type EditItemAction<TFast, TDetail> = {
    type: "editItem";
    payload: {
        oldUnique: ListKey;
        newUnique: ListKey;
        data: TDetail | TFast;
    };
};


/**
 * The action for removing an existing item to the data.
 */
export type RemoveItemAction = {
    type: "removeItem";
    payload: ListKey;
};


/**
 * The action in list reducer.
 */
export type ListAction<TFast, TDetail> =
    | AddItemAction<TFast, TDetail>
    | EditItemAction<TFast, TDetail>
    | RemoveItemAction
    | SetDataAction<TFast, TDetail>
    | BeginCreateAction
    | BeginEditAction
    | BeginDeleteAction
    | SetCurrentAction
    | ClearCurrentAction;


function replaceItem<TFast, TDetail>(
    oldData: Record<ListKey, TFast | TDetail>,
    options: EditItemAction<TFast, TDetail>["payload"]
): Record<ListKey, TFast | TDetail> {

    let found: boolean = false;
    const result = Object.keys(oldData).reduce(
        (acc, key) => {
            if (key !== options.oldUnique) {
                acc[key] = oldData[key];
            } else {
                found = true;
                acc[options.newUnique] = options.data;
            }
            return acc;
        }, {} as Record<ListKey, TFast | TDetail>
    );
    if (!found) {
        result[options.newUnique] = options.data;
    }
    return result;
}


/**
 * The reducer for the `use2StageList` hook.
 */
function reducer<TFast, TDetail>(
    state: Use2StageListState<TFast, TDetail>,
    action: ListAction<TFast, TDetail>
): Use2StageListState<TFast, TDetail> {
    switch (action.type) {
        case "beginCreate":
            return {
                ...state,
                current: null,
                mode: "create",
            };

        case "beginEdit":
            return {
                ...state,
                current: action.payload,
                mode: "edit",
            };

        case "beginDelete":
            return {
                ...state,
                current: action.payload,
                mode: "delete",
            };

        case "setCurrent":
            return {
                ...state,
                current: action.payload.item,
                mode: action.payload.mode ?? state.mode,
            };

        case "clearCurrent":
            return {
                ...state,
                current: null,
                mode: "list",
            };

        case "setData":
            return {
                ...state,
                data: action.payload,
            };

        case "editItem":
            if (action.payload.oldUnique !== action.payload.newUnique) {
                return {
                    ...state,
                    data: replaceItem(state.data, action.payload),
                };
            } else {
                return {
                    ...state,
                    data: {
                        ...state.data,
                        [action.payload.newUnique]: action.payload.data,
                    },
                };
            }

        case "addNewItem":
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.unique]: action.payload.data,
                },
            };

        case "removeItem":
            return {
                ...state,
                data: Object.keys(state.data).reduce(
                    (acc, key) => {
                        if (key !== action.payload) {
                            acc[key] = state.data[key];
                        }
                        return acc;
                    }, {} as Record<ListKey, TFast | TDetail>
                ),
            };

        default:
            return state;
    }
    return state;
}


/**
 * The result returned by the `use2StageList` hook.
 */
export interface Use2StageListResult<TFast, TDetail>
    extends Use2StageListState<TFast, TDetail> {

    /**
     * The callback used to begin creating an item.
     */
    beginCreate: () => void;

    /**
     * The callback used to begin editing an item.
     *
     * @param unique The slug of the item.
     */
    beginEdit: (unique: ListKey) => void;

    /**
     * The callback used to request deleting an item.
     *
     * @param unique The slug of the item.
     */
    beginDelete: (unique: ListKey) => void;

    /**
     * The callback for setting current item.
     *
     * The current item is also implicitly set by the `beginEdit` and
     * `beginDelete` callbacks.
     */
    setCurrent: (unique: ListKey, mode?: ListMode) => void;

    /**
     * The callback for clearing current item.
     */
    clearCurrent: () => void;

    /**
     * The callback for adding a new item.
     */
    addNewItem: (unique: ListKey, data: TDetail) => void;

    /**
     * The callback for editing an existing item.
     */
    editItem: (oldUnique: ListKey, newUnique: ListKey, data: TDetail) => void;

    /**
     * The callback for removing an existing item.
     */
    removeItem: (unique: ListKey) => void;

    /**
     * The user is allowed to create applications.
     */
    canCreate: boolean;

    /**
     * The user is allowed to read details about applications.
     */
    canRead: boolean;

    /**
     * The user is allowed to update applications.
     */
    canUpdate: boolean;

    /**
     * The user is allowed to delete applications.
     */
    canDelete: boolean;

    /**
     * The list of items is being loaded?
     */
    isListLoading: boolean;

    /**
     * There was an error loading the list of items.
     */
    errorInList?: AccessPointError;

    /**
     * Reload the list of items.
     */
    reloadList: () => Promise<AccessPointError | TFast>;

    /**
     * Clears any errors and results from the list of items.
     */
    resetList: () => void;
}


/**
 * The shape of the properties passed to the `use2StageList` hook.
 */
export interface Use2StageListProps<
    TPayloadList, TPathArgsList, TFast, TDetail
> {
    /**
     * The permissions required to create items.
     */
    createPerms: string[];

    /**
     * The permissions required to read items.
     */
    readPerms: string[];

    /**
     * The permissions required to update items.
     */
    updatePerms: string[];

    /**
     * The permissions required to delete items.
     */
    deletePerms: string[];

    /**
     * The hook to use for fetching the initial list of items.
     */
    useFetchList: () => UseApiResult<
        TPayloadList, TPathArgsList, TFast[], ApiContext
    >;

    /**
     * The hook to use for fetching the details of an item.
     */
    fetchDetail: (unique: ListKey) => Promise<TDetail | AccessPointError>;

    /**
     * The function that converts a fast item to unique key.
     */
    toKey: (fast: TFast) => ListKey;
}


/**
 * Generic hook for managing a list of items.
 */
export function use2StageList<
    TPayloadList, TPathArgsList, TFast, TDetail
>({
    createPerms,
    readPerms,
    updatePerms,
    deletePerms,
    useFetchList,
    fetchDetail,
    toKey,
}: Use2StageListProps<TPayloadList, TPathArgsList, TFast, TDetail>):
    Use2StageListResult<TFast, TDetail> {
        
    console.log("[use2StageList] createPerms: %O", createPerms);
    console.log("[use2StageList] readPerms: %O", readPerms);
    console.log("[use2StageList] updatePerms: %O", updatePerms);
    console.log("[use2StageList] deletePerms: %O", deletePerms);

    // Read the user and its permissions from the context.
    const {
        user_name,
        permissions,
    } = useSecMaContext();
    console.log("[use2StageList] user_name: %O", user_name);
    console.log("[use2StageList] user permissions: %O", permissions);

    // Determine the permissions of the user.
    const canCreate = !!user_name && createPerms.every(
        p => permissions.includes(p)
    );
    const canRead = !!user_name && readPerms.every(
        p => permissions.includes(p)
    );
    const canUpdate = !!user_name && updatePerms.every(
        p => permissions.includes(p)
    );
    const canDelete = !!user_name && deletePerms.every(
        p => permissions.includes(p)
    );
    console.log("[use2StageList] canCreate: %O", canCreate);
    console.log("[use2StageList] canRead: %O", canRead);
    console.log("[use2StageList] canUpdate: %O", canUpdate);
    console.log("[use2StageList] canDelete: %O", canDelete);

    const [state, dispatch] = useReducer(reducer, {
        data: {},
        current: null,
        mode: "list",
    });
    console.log("[use2StageList] state: %O", state);

    // Fetch the initial list of items.
    const {
        result: listResult,
        loading: isListLoading,
        error: errorInList,
        trigger: reloadList,
        reset: resetList,
    } = useFetchList();
    console.log(
        "[use2StageList] listResult: %O, loading: %s",
        listResult, isListLoading
    );
    console.log("[use2StageList] errorInList: %O", errorInList);


    // When the reply from the initial list of items is received...
    useEffect(() => {

        // if there was an error, do nothing.
        if (errorInList || !listResult) {
            console.log("[use2StageList] effect not running");
            return;
        }
        console.log("[use2StageList] effect running");

        // Create initial dataset.
        const dataset: Record<ListKey, TFast> = listResult.reduce(
            (acc: Record<ListKey, TFast>, fast: TFast) => {
                acc[toKey(fast)] = fast;
                return acc;
            }, {} as Record<ListKey, TFast>
        );

        // Save the initial list of items in the state.
        dispatch({ type: "setData", payload: dataset, });

        // If the user is not allowed to read the details, that's that.
        if (!canRead) {
            return;
        }

        // Go through each item in the list and fetch its details.
        Promise.all(
            Object.keys(dataset).map(
                unique => fetchDetail(unique).then((d) => [unique, d])
            )
        ).then((details) => {
            // Once all the details are fetched, save them in the state.
            dispatch({
                type: "setData",
                payload: (details as [ListKey, TDetail][]).reduce(
                    (acc, itr) => {
                        acc[itr[0]] = itr[1];
                        return acc;
                    }, {} as Record<ListKey, TDetail>
                )
            });
        });
    }, [listResult, errorInList, canRead, fetchDetail, toKey]);


    // The callback for beginning to create a new item.
    const beginCreate = useCallback(() => {
        if (canCreate) {
            dispatch({ type: "beginCreate", });
        }
    }, [canCreate]);


    // The callback for beginning to edit an item.
    const beginEdit = useCallback((unique: ListKey) => {
        if (canUpdate) {
            dispatch({ type: "beginEdit", payload: unique, });
        }
    }, [canUpdate]);


    // The callback for beginning to delete an item.
    const beginDelete = useCallback((unique: string) => {
        if (canDelete) {
            dispatch({ type: "beginDelete", payload: unique, });
        }
    }, [canDelete]);


    // The callback for setting current item.
    const setCurrent = useCallback((unique: string, mode?: ListMode) => {
        dispatch({
            type: "setCurrent", payload: {
                item: unique,
                mode,
            },
        });
    }, []);


    // The callback for clearing current item.
    const clearCurrent = useCallback(() => {
        dispatch({ type: "clearCurrent" });
    }, []);


    // The callback for adding a new item.
    const addNewItem = useCallback((unique: ListKey, data: TDetail) => {
        dispatch({
            type: "addNewItem",
            payload: {
                unique,
                data
            },
        });
    }, []);


    // The callback for editing an existing item.
    const editItem = useCallback((
        oldUnique: ListKey, newUnique: ListKey, data: TDetail
    ) => {
        dispatch({
            type: "editItem",
            payload: {
                oldUnique,
                newUnique,
                data
            },
        });
    }, []);


    // The callback for removing an existing item.
    const removeItem = useCallback((unique: ListKey) => {
        dispatch({
            type: "removeItem",
            payload: unique,
        });
    }, []);


    return {
        canCreate,
        canRead,
        canUpdate,
        canDelete,
        beginCreate,
        beginEdit,
        beginDelete,
        setCurrent,
        clearCurrent,
        isListLoading,
        errorInList,
        reloadList,
        resetList,
        addNewItem,
        editItem,
        removeItem,
        ...state
    } as Use2StageListResult<TFast, TDetail>;
}

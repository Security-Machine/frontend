import { Children, FC, cloneElement, useCallback } from "react";
import { enqueueSnackbar } from 'notistack';

import { useRoleListContext } from "./list";
import { useRoleDelete } from "../../api";


/**
 * Properties for the {@link RoleDelDialogInList} component.
 */
export interface RoleDelDialogInListProps {
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
    children: JSX.Element;
}


/**
 * A dialog that can be used to delete an item in a list.
 */
export const RoleDelDialogInList: FC<RoleDelDialogInListProps> = ({
    appSlug,
    tenSlug,
    children,
}) => {
    // Get the data from the context.
    const {
        mode, current, data, clearCurrent, removeItem
    } = useRoleListContext();
    console.log("[RoleDelDialogInList] mode %O", mode);
    console.log("[RoleDelDialogInList] current %O", current);
    console.log("[RoleDelDialogInList] data %O", data);


    // The cancel function.
    const onCancel = useCallback(() => {
        clearCurrent();
        console.log("[RoleDelDialogInList] onCancel");
    }, [clearCurrent]);

    // Hook access.
    const { trigger } = useRoleDelete();

    // The success function.
    const onConfirm = useCallback(() => {
        if (mode !== "delete" || !current) {
            console.log("[RoleDelDialogInList] Unexpected mode %O", mode);
            return;
        }
        console.log(
            "[RoleDelDialogInList] triggering deletion of %O",
            current
        );

        // Trigger the deletion.
        trigger(undefined, undefined, {
            appSlug, tenSlug, roleSlug: current as string
        }).then((result) => {
            console.log("[RoleDelDialogInList] trigger returns %O", result);
            if ("code" in result && "status" in result) {
                enqueueSnackbar(result.message, { variant: "error" });
            } else {
                removeItem(current);
            }
        });

        console.log("[RoleDelDialogInList] onSuccess %O", current);
        clearCurrent();
    }, [appSlug, tenSlug, mode, current, clearCurrent, removeItem, trigger]);

    // Make sure there's something to edit.
    if (!mode || !data || !current) {
        console.log("[RoleDelDialogInList] No mode, current or data.");
        return null;
    } else if (mode !== "delete") {
        console.log("[RoleDelDialogInList] mode %O", mode);
        return null;
    }

    // Prepare properties based on the mode.
    const properties = {
        onConfirm,
        onCancel,
        record: data[current]
    };

    // Render the form.
    const onlyChild = Children.only(children);
    return cloneElement(onlyChild, properties);
}


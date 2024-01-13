import { Children, FC, cloneElement, useCallback } from "react";
import { enqueueSnackbar } from 'notistack';

import { usePermListContext } from "./list";
import { usePermDelete } from "../../api";


/**
 * Properties for the {@link PermDelDialogInList} component.
 */
export interface PermDelDialogInListProps {
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
    children: JSX.Element;
}


/**
 * A dialog that can be used to delete an item in a list.
 */
export const PermDelDialogInList: FC<PermDelDialogInListProps> = ({
    appSlug,
    tenSlug,
    children,
}) => {
    // Get the data from the context.
    const {
        mode, current, data, clearCurrent, removeItem
    } = usePermListContext();
    console.log("[PermDelDialogInList] mode %O", mode);
    console.log("[PermDelDialogInList] current %O", current);
    console.log("[PermDelDialogInList] data %O", data);


    // The cancel function.
    const onCancel = useCallback(() => {
        clearCurrent();
        console.log("[PermDelDialogInList] onCancel");
    }, [clearCurrent]);

    // Hook access.
    const { trigger } = usePermDelete();

    // The success function.
    const onConfirm = useCallback(() => {
        if (mode !== "delete" || !current) {
            console.log("[PermDelDialogInList] Unexpected mode %O", mode);
            return;
        }
        console.log(
            "[PermDelDialogInList] triggering deletion of %O",
            current
        );

        // Trigger the deletion.
        trigger(undefined, undefined, {
            appSlug, tenSlug, permSlug: current as string
        }).then((result) => {
            console.log("[PermDelDialogInList] trigger returns %O", result);
            if ("code" in result && "status" in result) {
                enqueueSnackbar(result.message, { variant: "error" });
            } else {
                removeItem(current);
            }
        });

        console.log("[PermDelDialogInList] onSuccess %O", current);
        clearCurrent();
    }, [appSlug, tenSlug, mode, current, clearCurrent, removeItem, trigger]);

    // Make sure there's something to edit.
    if (!mode || !data || !current) {
        console.log("[PermDelDialogInList] No mode, current or data.");
        return null;
    } else if (mode !== "delete") {
        console.log("[PermDelDialogInList] mode %O", mode);
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


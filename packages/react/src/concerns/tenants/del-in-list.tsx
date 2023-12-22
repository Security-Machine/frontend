import { Children, FC, cloneElement, useCallback } from "react";
import { enqueueSnackbar } from 'notistack';

import { useTenantListContext } from "./list";
import { useTenantDelete } from "../../api";


/**
 * Properties for the {@link TenantDelDialogInList} component.
 */
export interface TenantDelDialogInListProps {
    /**
     * The slug of the application where the tenants are stored.
     */
    appSlug: string;

    /**
     * The children of the controller.
     */
    children: JSX.Element;
}


/**
 * A dialog that can be used to delete an item in a list.
 */
export const TenantDelDialogInList: FC<TenantDelDialogInListProps> = ({
    appSlug,
    children,
}) => {
    // Get the data from the context.
    const {
        mode, current, data, clearCurrent, removeItem
    } = useTenantListContext();
    console.log("[TenantDelDialogInList] mode %O", mode);
    console.log("[TenantDelDialogInList] current %O", current);
    console.log("[TenantDelDialogInList] data %O", data);


    // The cancel function.
    const onCancel = useCallback(() => {
        clearCurrent();
        console.log("[TenantDelDialogInList] onCancel");
    }, [clearCurrent]);

    // Hook access.
    const { trigger } = useTenantDelete();

    // The success function.
    const onConfirm = useCallback(() => {
        if (mode !== "delete" || !current) {
            console.log("[TenantDelDialogInList] Unexpected mode %O", mode);
            return;
        }
        console.log(
            "[TenantDelDialogInList] triggering deletion of %O",
            current
        );

        // Trigger the deletion.
        trigger(undefined, {
            appSlug, tenSlug: current as string
        }).then((result) => {
            console.log("[TenantDelDialogInList] trigger returns %O", result);
            if ("code" in result && "status" in result) {
                enqueueSnackbar(result.message, { variant: "error" });
            } else {
                removeItem(current);
            }
        });

        console.log("[TenantDelDialogInList] onSuccess %O", current);
        clearCurrent();
    }, [mode, current, clearCurrent, removeItem, trigger]);

    // Make sure there's something to edit.
    if (!mode || !data || !current) {
        console.log("[TenantDelDialogInList] No mode, current or data.");
        return null;
    } else if (mode !== "delete") {
        console.log("[TenantDelDialogInList] mode %O", mode);
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


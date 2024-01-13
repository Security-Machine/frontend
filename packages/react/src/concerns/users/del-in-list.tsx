import { Children, FC, cloneElement, useCallback } from "react";
import { enqueueSnackbar } from 'notistack';

import { useUserListContext } from "./list";
import { useUserDelete } from "../../api";


/**
 * Properties for the {@link UserDelDialogInList} component.
 */
export interface UserDelDialogInListProps {
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
    children: JSX.Element;
}


/**
 * A dialog that can be used to delete an item in a list.
 */
export const UserDelDialogInList: FC<UserDelDialogInListProps> = ({
    appSlug,
    tenSlug,
    children,
}) => {
    // Get the data from the context.
    const {
        mode, current, data, clearCurrent, removeItem
    } = useUserListContext();
    console.log("[UserDelDialogInList] mode %O", mode);
    console.log("[UserDelDialogInList] current %O", current);
    console.log("[UserDelDialogInList] data %O", data);


    // The cancel function.
    const onCancel = useCallback(() => {
        clearCurrent();
        console.log("[UserDelDialogInList] onCancel");
    }, [clearCurrent]);

    // Hook access.
    const { trigger } = useUserDelete();

    // The success function.
    const onConfirm = useCallback(() => {
        if (mode !== "delete" || !current) {
            console.log("[UserDelDialogInList] Unexpected mode %O", mode);
            return;
        }
        console.log(
            "[UserDelDialogInList] triggering deletion of %O",
            current
        );

        // Trigger the deletion.
        trigger(undefined, undefined, {
            appSlug, tenSlug, userSlug: current as string
        }).then((result) => {
            console.log("[UserDelDialogInList] trigger returns %O", result);
            if ("code" in result && "status" in result) {
                enqueueSnackbar(result.message, { variant: "error" });
            } else {
                removeItem(current);
            }
        });

        console.log("[UserDelDialogInList] onSuccess %O", current);
        clearCurrent();
    }, [appSlug, tenSlug, mode, current, clearCurrent, removeItem, trigger]);

    // Make sure there's something to edit.
    if (!mode || !data || !current) {
        console.log("[UserDelDialogInList] No mode, current or data.");
        return null;
    } else if (mode !== "delete") {
        console.log("[UserDelDialogInList] mode %O", mode);
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


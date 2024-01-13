import { Children, FC, cloneElement, useCallback } from "react";
import { enqueueSnackbar } from 'notistack';
import { useAppListContext } from "./list";
import { useAppDelete } from "../../api";

/**
 * Properties for the {@link AppDelDialogInList} component.
 */
export interface AppDelDialogInListProps {
    children: JSX.Element;
}


/**
 * A dialog that can be used to delete an item in a list.
 */
export const AppDelDialogInList: FC<AppDelDialogInListProps> = ({
    children,
}) => {
    // Get the data from the context.
    const {
        mode, current, data, clearCurrent, removeItem
    } = useAppListContext();
    console.log("[AppDelDialogInList] mode %O", mode);
    console.log("[AppDelDialogInList] current %O", current);
    console.log("[AppDelDialogInList] data %O", data);


    // The cancel function.
    const onCancel = useCallback(() => {
        clearCurrent();
        console.log("[AppDelDialogInList] onCancel");
    }, [clearCurrent]);

    // Hook access.
    const { trigger } = useAppDelete();

    // The success function.
    const onConfirm = useCallback(() => {
        if (mode !== "delete" || !current) {
            console.log("[AppDelDialogInList] Unexpected mode %O", mode);
            return;
        }
        console.log("[AppDelDialogInList] triggering deletion of %O", current);

        // Trigger the deletion.
        trigger(undefined, undefined, { slug: current as string }).then((result) => {
            console.log("[AppDelDialogInList] trigger returns %O", result);
            if ("code" in result && "status" in result) {
                enqueueSnackbar(result.message, { variant: "error" });
            } else {
                removeItem(current);
            }
        });

        console.log("[AppDelDialogInList] onSuccess %O", current);
        clearCurrent();
    }, [mode, current, clearCurrent, removeItem, trigger]);

    // Make sure there's something to edit.
    if (!mode || !data || !current) {
        console.log("[AppDelDialogInList] No mode, current or data.");
        return null;
    } else if (mode !== "delete") {
        console.log("[AppDelDialogInList] mode %O", mode);
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


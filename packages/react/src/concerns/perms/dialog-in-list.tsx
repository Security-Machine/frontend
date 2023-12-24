import { FC, cloneElement, Children, useCallback } from "react";
import { PermData, PermInput } from "@secma/base";

import { usePermListContext } from "./list";


/**
 * Properties passed to the child component.
 */
export interface PermEditDialogChildProps {
    /**
     * The function to call when the perm clicks the cancel button
     * or otherwise dismisses the dialog.
     */
    onCancel: () => void;

    /**
     * The function to call when the server accepted the change.
     */
    onSuccess: (value: PermData) => void;

    /**
     * The slug of the application where the perms are stored.
     */
    appSlug: string;

    /**
     * The slug of the tenant where the perms are stored.
     */
    tenSlug: string;

    /**
     * The initial values if we're editing an existing perm.
     * If we're creating a new perm, this property is `undefined`.
     */
    initialValues?: PermInput;
}


/**
 * Properties for the {@link PermEditDialogInList} component.
 */
export interface PermEditDialogInListProps {
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
 * A dialog that can be used to edit the values in a list and to create new
 * values.
 *
 * It uses the list context to determine the mode and current item,
 * shows the corresponding form and updates the list when the form is
 * submitted.
 *
 * You will have to provide the form control yourself; it should expect
 * a set of properties defined by {@link PermEditDialogChildProps}.
 *
 */
export const PermEditDialogInList: FC<PermEditDialogInListProps> = ({
    appSlug,
    tenSlug,
    children,
}) => {
    // Get the data from the context.
    const {
        mode, current, data, clearCurrent,
        addNewItem, editItem,
    } = usePermListContext();
    console.log("[PermEditDialogInList] mode %O", mode);
    console.log("[PermEditDialogInList] current %O", current);
    console.log("[PermEditDialogInList] data %O", data);

    // The cancel function.
    const onCancel = useCallback(() => {
        clearCurrent();
        console.log("[PermEditDialogInList] onCancel");
    }, [clearCurrent]);


    // The success function.
    const onSuccess = useCallback((value: PermData) => {
        if (mode === "create") {
            console.log("[PermEditDialogInList] Creating a new perm.");
            addNewItem(value.name, value);
        } else if (mode === "edit" && current) {
            console.log("[PermEditDialogInList] Editing an existing perm.");
            editItem(current, value.name, value);
        } else {
            console.log("[PermEditDialogInList] Unexpected mode %O", mode);
            return;
        }
        console.log("[PermEditDialogInList] onSuccess %O", value);
        clearCurrent();
    }, [mode, current, clearCurrent, addNewItem, editItem]);


    // Make sure there's something to edit.
    if (!mode || !data) {
        console.log("[PermEditDialogInList] No mode, current or data.");
        return null;
    }

    // Prepare properties based on the mode.
    const properties: PermEditDialogChildProps = {
        appSlug,
        tenSlug,
        onCancel,
        onSuccess,
    };
    if (mode === "create") {
        console.log("[PermEditDialogInList] Creating a new perm.");
    } else if (mode === "edit") {
        if (!current) {
            console.log("[PermEditDialogInList] No current perm.");
            return null;
        }
        // Make sure that the perm was able to retrieve the details.
        const currentData = data[current];
        if (typeof currentData === "string") {
            console.log("[PermEditDialogInList] No extended data.");
            return null;
        }

        console.log("[PermEditDialogInList] Editing an existing perm.");
        properties.initialValues = currentData;
    } else {
        return null;
    }

    // Render the form.
    const onlyChild = Children.only(children);
    return cloneElement(onlyChild, properties);
}

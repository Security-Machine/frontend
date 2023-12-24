import { FC, cloneElement, Children, useCallback } from "react";
import { RoleData, RoleInput } from "@secma/base";

import { useRoleListContext } from "./list";


/**
 * Properties passed to the child component.
 */
export interface RoleEditDialogChildProps {
    /**
     * The function to call when the role clicks the cancel button
     * or otherwise dismisses the dialog.
     */
    onCancel: () => void;

    /**
     * The function to call when the server accepted the change.
     */
    onSuccess: (value: RoleData) => void;

    /**
     * The slug of the application where the roles are stored.
     */
    appSlug: string;

    /**
     * The slug of the tenant where the roles are stored.
     */
    tenSlug: string;

    /**
     * The initial values if we're editing an existing role.
     * If we're creating a new role, this property is `undefined`.
     */
    initialValues?: RoleInput;
}


/**
 * Properties for the {@link RoleEditDialogInList} component.
 */
export interface RoleEditDialogInListProps {
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
 * A dialog that can be used to edit the values in a list and to create new
 * values.
 *
 * It uses the list context to determine the mode and current item,
 * shows the corresponding form and updates the list when the form is
 * submitted.
 *
 * You will have to provide the form control yourself; it should expect
 * a set of properties defined by {@link RoleEditDialogChildProps}.
 *
 */
export const RoleEditDialogInList: FC<RoleEditDialogInListProps> = ({
    appSlug,
    tenSlug,
    children,
}) => {
    // Get the data from the context.
    const {
        mode, current, data, clearCurrent,
        addNewItem, editItem,
    } = useRoleListContext();
    console.log("[RoleEditDialogInList] mode %O", mode);
    console.log("[RoleEditDialogInList] current %O", current);
    console.log("[RoleEditDialogInList] data %O", data);

    // The cancel function.
    const onCancel = useCallback(() => {
        clearCurrent();
        console.log("[RoleEditDialogInList] onCancel");
    }, [clearCurrent]);


    // The success function.
    const onSuccess = useCallback((value: RoleData) => {
        if (mode === "create") {
            console.log("[RoleEditDialogInList] Creating a new role.");
            addNewItem(value.name, value);
        } else if (mode === "edit" && current) {
            console.log("[RoleEditDialogInList] Editing an existing role.");
            editItem(current, value.name, value);
        } else {
            console.log("[RoleEditDialogInList] Unexpected mode %O", mode);
            return;
        }
        console.log("[RoleEditDialogInList] onSuccess %O", value);
        clearCurrent();
    }, [mode, current, clearCurrent, addNewItem, editItem]);


    // Make sure there's something to edit.
    if (!mode || !data) {
        console.log("[RoleEditDialogInList] No mode, current or data.");
        return null;
    }

    // Prepare properties based on the mode.
    const properties: RoleEditDialogChildProps = {
        appSlug,
        tenSlug,
        onCancel,
        onSuccess,
    };
    if (mode === "create") {
        console.log("[RoleEditDialogInList] Creating a new role.");
    } else if (mode === "edit") {
        if (!current) {
            console.log("[RoleEditDialogInList] No current role.");
            return null;
        }
        // Make sure that the role was able to retrieve the details.
        const currentData = data[current];
        if (typeof currentData === "string") {
            console.log("[RoleEditDialogInList] No extended data.");
            return null;
        }

        console.log("[RoleEditDialogInList] Editing an existing role.");
        properties.initialValues = currentData;
    } else {
        return null;
    }

    // Render the form.
    const onlyChild = Children.only(children);
    return cloneElement(onlyChild, properties);
}

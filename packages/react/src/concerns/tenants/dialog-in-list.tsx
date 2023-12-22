import { FC, cloneElement, Children, useCallback } from "react";
import { TenantData, TenantInput } from "@secma/base";

import { useTenantListContext } from "./list";


/**
 * Properties passed to the child component.
 */
export interface TenantEditDialogChildProps {
    /**
     * The function to call when the user clicks the cancel button
     * or otherwise dismisses the dialog.
     */
    onCancel: () => void;

    /**
     * The function to call when the server accepted the change.
     */
    onSuccess: (value: TenantData) => void;

    /**
     * The slug of the application where the tenants are stored.
     */
    appSlug: string;

    /**
     * The initial values if we're editing an existing tenant.
     * If we're creating a new tenant, this property is `undefined`.
     */
    initialValues?: TenantInput;
}


/**
 * Properties for the {@link TenantEditDialogInList} component.
 */
export interface TenantEditDialogInListProps {
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
 * A dialog that can be used to edit the values in a list and to create new
 * values.
 *
 * It uses the list context to determine the mode and current item,
 * shows the corresponding form and updates the list when the form is
 * submitted.
 *
 * You will have to provide the form control yourself; it should expect
 * a set of properties defined by {@link TenantEditDialogChildProps}.
 *
 */
export const TenantEditDialogInList: FC<TenantEditDialogInListProps> = ({
    appSlug,
    children,
}) => {
    // Get the data from the context.
    const {
        mode, current, data, clearCurrent,
        addNewItem, editItem,
    } = useTenantListContext();
    console.log("[TenantEditDialogInList] mode %O", mode);
    console.log("[TenantEditDialogInList] current %O", current);
    console.log("[TenantEditDialogInList] data %O", data);

    // The cancel function.
    const onCancel = useCallback(() => {
        clearCurrent();
        console.log("[TenantEditDialogInList] onCancel");
    }, [clearCurrent]);


    // The success function.
    const onSuccess = useCallback((value: TenantData) => {
        if (mode === "create") {
            console.log("[TenantEditDialogInList] Creating a new tenant.");
            addNewItem(value.slug, value);
        } else if (mode === "edit" && current) {
            console.log("[TenantEditDialogInList] Editing an existing tenant.");
            editItem(current, value.slug, value);
        } else {
            console.log("[TenantEditDialogInList] Unexpected mode %O", mode);
            return;
        }
        console.log("[TenantEditDialogInList] onSuccess %O", value);
        clearCurrent();
    }, [mode, current, clearCurrent, addNewItem, editItem]);


    // Make sure there's something to edit.
    if (!mode || !data) {
        console.log("[TenantEditDialogInList] No mode, current or data.");
        return null;
    }

    // Prepare properties based on the mode.
    const properties: TenantEditDialogChildProps = {
        appSlug,
        onCancel,
        onSuccess,
    };
    if (mode === "create") {
        console.log("[TenantEditDialogInList] Creating a new tenant.");
    } else if (mode === "edit") {
        if (!current) {
            console.log("[TenantEditDialogInList] No current tenant.");
            return null;
        }
        // Make sure that the user was able to retrieve the details.
        const currentData = data[current];
        if (typeof currentData === "string") {
            console.log("[TenantEditDialogInList] No extended data.");
            return null;
        }

        console.log("[TenantEditDialogInList] Editing an existing tenant.");
        properties.initialValues = currentData;
    } else {
        return null;
    }

    // Render the form.
    const onlyChild = Children.only(children);
    return cloneElement(onlyChild, properties);
}

import { FC, cloneElement, Children, useCallback } from "react";
import { UserData, UserInput } from "@secma/base";

import { useUserListContext } from "./list";


/**
 * Properties passed to the child component.
 */
export interface UserEditDialogChildProps {
    /**
     * The function to call when the user clicks the cancel button
     * or otherwise dismisses the dialog.
     */
    onCancel: () => void;

    /**
     * The function to call when the server accepted the change.
     */
    onSuccess: (value: UserData) => void;

    /**
     * The slug of the application where the users are stored.
     */
    appSlug: string;

    /**
     * The slug of the tenant where the users are stored.
     */
    tenSlug: string;

    /**
     * The initial values if we're editing an existing user.
     * If we're creating a new user, this property is `undefined`.
     */
    initialValues?: UserInput;
}


/**
 * Properties for the {@link UserEditDialogInList} component.
 */
export interface UserEditDialogInListProps {
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
 * A dialog that can be used to edit the values in a list and to create new
 * values.
 *
 * It uses the list context to determine the mode and current item,
 * shows the corresponding form and updates the list when the form is
 * submitted.
 *
 * You will have to provide the form control yourself; it should expect
 * a set of properties defined by {@link UserEditDialogChildProps}.
 *
 */
export const UserEditDialogInList: FC<UserEditDialogInListProps> = ({
    appSlug,
    tenSlug,
    children,
}) => {
    // Get the data from the context.
    const {
        mode, current, data, clearCurrent,
        addNewItem, editItem,
    } = useUserListContext();
    console.log("[UserEditDialogInList] mode %O", mode);
    console.log("[UserEditDialogInList] current %O", current);
    console.log("[UserEditDialogInList] data %O", data);

    // The cancel function.
    const onCancel = useCallback(() => {
        clearCurrent();
        console.log("[UserEditDialogInList] onCancel");
    }, [clearCurrent]);


    // The success function.
    const onSuccess = useCallback((value: UserData) => {
        if (mode === "create") {
            console.log("[UserEditDialogInList] Creating a new user.");
            addNewItem(value.name, value);
        } else if (mode === "edit" && current) {
            console.log("[UserEditDialogInList] Editing an existing user.");
            editItem(current, value.name, value);
        } else {
            console.log("[UserEditDialogInList] Unexpected mode %O", mode);
            return;
        }
        console.log("[UserEditDialogInList] onSuccess %O", value);
        clearCurrent();
    }, [mode, current, clearCurrent, addNewItem, editItem]);


    // Make sure there's something to edit.
    if (!mode || !data) {
        console.log("[UserEditDialogInList] No mode, current or data.");
        return null;
    }

    // Prepare properties based on the mode.
    const properties: UserEditDialogChildProps = {
        appSlug,
        tenSlug,
        onCancel,
        onSuccess,
    };
    if (mode === "create") {
        console.log("[UserEditDialogInList] Creating a new user.");
    } else if (mode === "edit") {
        if (!current) {
            console.log("[UserEditDialogInList] No current user.");
            return null;
        }
        // Make sure that the user was able to retrieve the details.
        const currentData = data[current];
        if (typeof currentData === "string") {
            console.log("[UserEditDialogInList] No extended data.");
            return null;
        }

        console.log("[UserEditDialogInList] Editing an existing user.");
        properties.initialValues = currentData;
    } else {
        return null;
    }

    // Render the form.
    const onlyChild = Children.only(children);
    return cloneElement(onlyChild, properties);
}

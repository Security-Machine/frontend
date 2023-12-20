import { FC, cloneElement, Children, useCallback } from "react";
import { useAppListContext } from "./list";
import { ApplicationData, ApplicationInput } from "@secma/base";


/**
 * Properties passed to the child component.
 */
export interface AppEditDialogChildProps {
    /**
     * The function to call when the user clicks the cancel button
     * or otherwise dismisses the dialog.
     */
    onCancel: () => void;

    /**
     * The function to call when the server accepted the change.
     */
    onSuccess: (value: ApplicationData) => void;

    /**
     * The initial values if we're editing an existing application.
     * If we're creating a new application, this property is `undefined`.
     */
    initialValues?: ApplicationInput;
}


/**
 * Properties for the {@link AppEditDialogInList} component.
 */
export interface AppEditDialogInListProps {
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
 * You will have to provide the form yourself.
 */
export const AppEditDialogInList: FC<AppEditDialogInListProps> = ({
    children,
}) => {
    // Get the data from the context.
    const { mode, current, data, clearCurrent } = useAppListContext();
    console.log("[AppEditDialogInList] mode %O", mode);
    console.log("[AppEditDialogInList] current %O", current);
    console.log("[AppEditDialogInList] data %O", data);

    // The cancel function.
    const onCancel = useCallback(() => {
        clearCurrent();
    }, [clearCurrent]);

    // The success function.
    const onSuccess = useCallback((value: ApplicationData) => {
        clearCurrent();
    }, [clearCurrent]);


    // Make sure there's something to edit.
    if (!mode || !data) {
        console.log("[AppEditDialogInList] No mode, current or data.");
        return null;
    }

    // Prepare properties based on the mode.
    const properties: AppEditDialogChildProps = {
        onCancel,
        onSuccess,
    };
    if (mode === "create") {
        console.log("[AppEditDialogInList] Creating a new application.");
    } else if (mode === "edit") {
        if (!current) {
            console.log("[AppEditDialogInList] No current application.");
            return null;
        }
        // Make sure that the user was able to retrieve the details.
        const currentData = data[current];
        if (typeof currentData === "string") {
            console.log("[AppEditDialogInList] No extended data.");
            return null;
        }

        console.log("[AppEditDialogInList] Editing an existing application.");
        properties.initialValues = currentData;
    } else {
        return null;
    }

    // Render the form.
    const onlyChild = Children.only(children);
    return cloneElement(onlyChild, properties);
}

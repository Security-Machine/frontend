import { FC, ReactNode, useCallback } from "react";
import { useIntl } from "react-intl";
import type { ApplicationInput } from "@secma/base";
import {
    validateDescription, validateSlug, validateTitle
} from "@secma/base";

import { EditController } from "../../lcrud/edit-controller";


/**
 * Properties expected by the {@link AppEditController} component.
 */
export interface AppEditControllerProps {
    /**
     * The initial values of the form.
     *
     * If this field is set we're dealing with an edit form. If it's not set
     * we're dealing with a create form.
     */
    initialValues?: Partial<ApplicationInput>;

    /**
     * The children of the EditController component.
     */
    children: ReactNode;
}


/**
 * Controller for editing and creating applications.
 */
export const AppEditController: FC<AppEditControllerProps> = ({
    initialValues,
    children,
}) => {
    // The translation provider.
    const { formatMessage } = useIntl();

    // The callback used to validate the form.
    const validate = useCallback((values: ApplicationInput) => {
        const result: Record<string, string> = {};

        const slugError = validateSlug(values.slug, formatMessage);
        if (slugError) {
            result["slug"] = slugError;
        }

        const titleError = validateTitle(values.title, formatMessage, true);
        if (titleError) {
            result["title"] = titleError;
        }

        const descriptionError = validateDescription(
            values.description, formatMessage
        );
        if (descriptionError) {
            result["description"] = descriptionError;
        }

        // console.log("[SecMaAppCreateController] validate %O", result);
        return result;
    }, []);


    return (
        <EditController<ApplicationInput>
            initialValues={initialValues}
            validate={validate}
        >
            {children}
        </EditController>
    );
}

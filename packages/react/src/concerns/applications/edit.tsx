import { FC, ReactNode, useCallback } from "react";
import { useIntl } from "react-intl";
import type { ApiContext, ApplicationData, ApplicationInput } from "@secma/base";
import {
    validateDescription, validateSlug, validateTitle
} from "@secma/base";

import { EditController } from "../../lcrud/edit-controller";
import { useAppCreate, useAppEdit } from "../../api";
import { UseApiResult } from "@vebgen/use-api";


/**
 * Properties expected by the {@link AppEditController} component.
 */
export interface AppEditControllerProps {
    /**
     * The initial values of the form.
     *
     * If this field is set we're dealing with an edit form. If it's not set
     * we're dealing with a create form.
     *
     * This field's value should not change during the lifetime of the
     * component. If you need to change the initial values, set the key prop
     * to a different value.
     */
    initialValues?: Partial<ApplicationInput>;

    /**
     * The callback triggered when the API call succeeds.
     *
     * The result can be undefined, in which case the form is considered valid.
     * If the result is an object, it is expected to contain the validation
     * errors. If the object is empty the form is considered valid. For
     * form-wide errors use the key `FORM_ERROR` constant. The result
     * can also be a promise that resolves to the above.
     */
    onSuccess?: (result: ApplicationData) => (
        (Record<string, string> | void) |
        Promise<Record<string, string> | void>
    );

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
    onSuccess,
}) => {
    // The translation provider.
    const { formatMessage } = useIntl();

    // The API hook to create or update an application.
    // Note that the hooks should not be called inside conditional.
    // It is fine here since we impose a restriction on the initialValues
    // prop to have same value throughout the lifetime of the component.
    let hookValue: UseApiResult<any, any, ApplicationData, ApiContext>;
    if (initialValues === undefined) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        hookValue = useAppCreate();
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        hookValue = useAppEdit(initialValues.slug);
    }

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
    }, [formatMessage]);


    return (
        <EditController<ApplicationData>
            initialValues={initialValues}
            validate={validate}
            hookValue={hookValue}
            onSuccess={onSuccess}
        >
            {children}
        </EditController>
    );
}

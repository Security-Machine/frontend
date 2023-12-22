import { FC, ReactNode, useCallback } from "react";
import { useIntl } from "react-intl";
import type { TenantData, TenantInput } from "@secma/base";
import {
    validateDescription, validateSlug, validateTitle
} from "@secma/base";

import { EditController } from "../../lcrud/edit-controller";
import { SecMaApiResult, useTenantCreate, useTenantEdit } from "../../api";


/**
 * Properties expected by the {@link TenantEditController} component.
 */
export interface TenantEditControllerProps {
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
    initialValues?: Partial<TenantInput>;

    /**
     * The callback triggered when the API call succeeds.
     *
     * The result can be undefined, in which case the form is considered valid.
     * If the result is an object, it is expected to contain the validation
     * errors. If the object is empty the form is considered valid. For
     * form-wide errors use the key `FORM_ERROR` constant. The result
     * can also be a promise that resolves to the above.
     */
    onSuccess?: (result: TenantData) => (
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
export const TenantEditController: FC<TenantEditControllerProps> = ({
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
    let hookValue: SecMaApiResult<any, any, TenantData>;
    if (initialValues === undefined) {
        hookValue = useTenantCreate();
    } else {
        hookValue = useTenantEdit(initialValues.slug);
    }

    // The callback used to validate the form.
    const validate = useCallback((values: TenantInput) => {
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

        // console.log("[SecMaTenantCreateController] validate %O", result);
        return result;
    }, [formatMessage]);


    return (
        <EditController<TenantData>
            initialValues={initialValues}
            validate={validate}
            hookValue={hookValue}
            onSuccess={onSuccess}
        >
            {children}
        </EditController>
    );
}

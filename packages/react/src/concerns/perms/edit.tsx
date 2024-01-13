import { FC, ReactNode, useCallback } from "react";
import { useIntl } from "react-intl";
import type { ApiContext, PermData, PermInput } from "@secma/base";
import {
    validateDescription, validateName
} from "@secma/base";

import { EditController } from "../../lcrud/edit-controller";
import { usePermCreate, usePermEdit } from "../../api";
import { UseApiResult } from "@vebgen/use-api";


/**
 * Properties expected by the {@link PermEditController} component.
 */
export interface PermEditControllerProps {
    /**
     * The slug of the application where the perms are stored.
     */
    appSlug: string;

    /**
     * The slug of the tenant where the perms are stored.
     */
    tenSlug: string;

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
    initialValues?: Partial<PermInput>;

    /**
     * The callback triggered when the API call succeeds.
     *
     * The result can be undefined, in which case the form is considered valid.
     * If the result is an object, it is expected to contain the validation
     * errors. If the object is empty the form is considered valid. For
     * form-wide errors use the key `FORM_ERROR` constant. The result
     * can also be a promise that resolves to the above.
     */
    onSuccess?: (result: PermData) => (
        (Record<string, string> | void) |
        Promise<Record<string, string> | void>
    );

    /**
     * The children of the EditController component.
     */
    children: ReactNode;
}


/**
 * Controller for editing and creating permissions.
 */
export const PermEditController: FC<PermEditControllerProps> = ({
    initialValues,
    children,
    appSlug,
    tenSlug,
    onSuccess,
}) => {
    // The translation provider.
    const { formatMessage } = useIntl();

    // The API hook to create or update an application.
    // Note that the hooks should not be called inside conditional.
    // It is fine here since we impose a restriction on the initialValues
    // prop to have same value throughout the lifetime of the component.
    let hookValue: UseApiResult<any, any, PermData, ApiContext>;
    if (initialValues === undefined) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        hookValue = usePermCreate(appSlug, tenSlug);
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        hookValue = usePermEdit(appSlug, tenSlug, initialValues.name);
    }

    // The callback used to validate the form.
    const validate = useCallback((values: PermInput) => {
        const result: Record<string, string> = {};

        const slugError = validateName(values.name, formatMessage);
        if (slugError) {
            result["name"] = slugError;
        }

        const descriptionError = validateDescription(
            values.description, formatMessage
        );
        if (descriptionError) {
            result["description"] = descriptionError;
        }

        // console.log("[SecMaPermCreateController] validate %O", result);
        return result;
    }, [formatMessage]);


    return (
        <EditController<PermData>
            initialValues={initialValues}
            validate={validate}
            hookValue={hookValue}
            onSuccess={onSuccess}
        >
            {children}
        </EditController>
    );
}

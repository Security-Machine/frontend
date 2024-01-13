import { FC, ReactNode, useCallback } from "react";
import { useIntl } from "react-intl";
import type { ApiContext, UserData, UserInput } from "@secma/base";
import {
    validateDescription, validateUserName
} from "@secma/base";

import { EditController } from "../../lcrud/edit-controller";
import { useUserCreate, useUserEdit } from "../../api";
import { UseApiResult } from "@vebgen/use-api";


/**
 * Properties expected by the {@link UserEditController} component.
 */
export interface UserEditControllerProps {
    /**
     * The slug of the application where the users are stored.
     */
    appSlug: string;

    /**
     * The slug of the tenant where the users are stored.
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
    initialValues?: Partial<UserInput>;

    /**
     * The callback triggered when the API call succeeds.
     *
     * The result can be undefined, in which case the form is considered valid.
     * If the result is an object, it is expected to contain the validation
     * errors. If the object is empty the form is considered valid. For
     * form-wide errors use the key `FORM_ERROR` constant. The result
     * can also be a promise that resolves to the above.
     */
    onSuccess?: (result: UserData) => (
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
export const UserEditController: FC<UserEditControllerProps> = ({
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
    let hookValue: UseApiResult<any, any, UserData, ApiContext>;
    if (initialValues === undefined) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        hookValue = useUserCreate(appSlug, tenSlug);
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        hookValue = useUserEdit(appSlug, tenSlug, initialValues.name);
    }

    // The callback used to validate the form.
    const validate = useCallback((values: UserInput) => {
        const result: Record<string, string> = {};

        const slugError = validateUserName(values.name, formatMessage);
        if (slugError) {
            result["name"] = slugError;
        }

        const descriptionError = validateDescription(
            values.description, formatMessage
        );
        if (descriptionError) {
            result["description"] = descriptionError;
        }

        // console.log("[SecMaUserCreateController] validate %O", result);
        return result;
    }, [formatMessage]);


    return (
        <EditController<UserData>
            initialValues={initialValues}
            validate={validate}
            hookValue={hookValue}
            onSuccess={onSuccess}
        >
            {children}
        </EditController>
    );
}

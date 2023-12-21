import { ReactNode, useCallback } from "react";
import { Form } from "react-final-form";
import { FORM_ERROR } from "final-form";

import { SecMaApiResult } from "../api";


/**
 * Properties expected by the {@link EditController} component.
 */
export interface EditControllerProps<T extends object> {
    /**
     * A function that validates the form values.
     *
     * The function returns an object expected to contain the validation errors.
     * If the object is empty the form is considered valid. For form-wide
     * errors the key `FORM_ERROR` constant.
     */
    validate?: (values: T) => Record<string, string>;

    /**
     * The initial values of the form.
     *
     * If this field is set we're dealing with an edit form. If it's not set
     * we're dealing with a create form.
     */
    initialValues?: Partial<T>;

    /**
     * The API hook to create or update an application.
     */
    hookValue: SecMaApiResult<any, any, T>;

    /**
     * The callback triggered when the API call succeeds.
     *
     * The result can be undefined, in which case the form is considered valid.
     * If the result is an object, it is expected to contain the validation
     * errors. If the object is empty the form is considered valid. For
     * form-wide errors use the key `FORM_ERROR` constant. The result
     * can also be a promise that resolves to the above.
     */
    onSuccess?: (result: T) => (
        (Record<string, string> | void) |
        Promise<Record<string, string> | void>
    );

    /**
     * The children of the EditController component.
     */
    children: ReactNode;
}


/**
 * The EditController component manages creating and editing records.
 *
 * It wraps the children in a form and provides the submit handler that
 * makes the API call to create or update the record.
 */
export function EditController<T extends object>({
    validate,
    initialValues,
    children,
    onSuccess,
    hookValue: {
        trigger,
    }
}: EditControllerProps<T>) {
    // Determine the mode.
    const mode: "create" | "edit" = initialValues === undefined
        ? "edit"
        : "create";
    console.log("[EditController] mode %s", mode);


    // The callback used to create or update an application.
    const onSubmit = useCallback((
        values: T,
        // form: FormApi<T, Partial<T>>,
        // callback?: (errors?: Record<string, string>) => void
    ) => {
        console.log("[EditController] onSubmit %O", values);
        return trigger(values as any).then((result) => {
            console.log("[EditController] onSubmit result %O", result);

            const formResult: Record<string, string> = {};
            if ("code" in result && "status" in result) {
                // We have an error
                formResult[FORM_ERROR] = result.message;
            } else if (onSuccess) {
                // We have a good result.
                const userResult = onSuccess(result as T);
                if (userResult instanceof Promise) {
                    return userResult.then((userResult) => {
                        if (userResult !== undefined) {
                            return userResult;
                        }
                        return formResult;
                    });
                } else {
                    if (userResult !== undefined) {
                        return userResult;
                    }
                    return formResult;
                }
            }

            return formResult;
        });
    }, [trigger, onSuccess]);


    return (
        <Form<T>
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    {children}
                </form>
            )}
        />
    );
}

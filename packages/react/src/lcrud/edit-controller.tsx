import { ReactNode, useCallback } from "react";
import { Form } from "react-final-form";
import { FormApi } from "final-form";


/**
 * Properties expected by the {@link EditController} component.
 */
export interface EditControllerProps<T> {
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
export function EditController<T>({
    validate,
    initialValues,
    children,
}: EditControllerProps<T>) {
    // Determine the mode.
    const mode: "create" | "edit" = initialValues === undefined
        ? "edit"
        : "create";
    console.log("[EditController] mode %s", mode);


    // The callback used to create or update an application.
    const onSubmit = useCallback((
        values: T,
        form: FormApi<T, Partial<T>>,
        callback?: (errors?: Record<string, string>) => void
    ) => {



    }, []);


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

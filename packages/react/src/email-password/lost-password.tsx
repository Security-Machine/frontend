import { FC, ReactNode, useCallback } from "react";
import { Form } from "react-final-form";
import { useIntl } from "react-intl";


const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;


/**
 * The properties expected by the {@link LostPasswordForm}.
 */
export interface LostPasswordFormProps {
    /**
     * The children rendered inside the form.
     */
    children: ReactNode;
}


/**
 * The state managed by final-form.
 */
export interface LostPasswordFormState {
    email: string;
}


/**
 * The form for sending an email to reset the password.
 */
export const LostPasswordForm: FC<LostPasswordFormProps> = ({
    children,
}) => {
    // Translation provider.
    const intl = useIntl();

    // The callback used to validate the form.
    const validate = useCallback((values: LostPasswordFormState) => {
        // Accumulate errors here.
        const result: Record<string, string> = {};

        if (!values.email) {
            result.email = intl.formatMessage({
                id: 'secma-react.lost.errRequired',
                defaultMessage: 'The email is required.',
            });
        } else if (!emailPattern.test(values.email)) {
            result.email = intl.formatMessage({
                id: 'secma-react.lost.errEmailPattern',
                defaultMessage: 'Please provide a valid email.',
            });
        }

        return result;
    }, [intl]);


    // The callback used to submit the form.
    const submit = useCallback((values: LostPasswordFormState) => {
        console.log('[%s] Sending message to %O', values);

        // TODO:
    }, []);


    // Render the form.
    return (
        <Form<LostPasswordFormState>
            onSubmit={submit}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    {children}
                </form>
            )}
        />
    )
}

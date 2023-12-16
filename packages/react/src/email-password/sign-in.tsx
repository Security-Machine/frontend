import { FC, ReactNode, useCallback, useEffect } from 'react';
import { Form } from 'react-final-form';
import { useIntl } from 'react-intl';
import { useSecMaContext } from '../user-controller';


/**
 * Properties expected by the {@link SignInForm}.
 */
export interface SignInFormProps {

    /**
     * The callback triggered when an user was signed in.
     */
    onSignIn?: () => void;

    /**
     * The children rendered inside the form.
     */
    children: ReactNode;
}


/**
 * The state managed by final-form.
 */
export interface SignInFormState {
    /**
     * The email or username.
     */
    username: string;

    /**
     * The password for this user.
     */
    password: string;

    /**
     * The password.
     */
    rememberMe: boolean;
}


// The initial values for the form.
const initialValues: SignInFormState = {
    username: '',
    password: '',
    rememberMe: false,
};


/**
 * The sign in form.
 */
export const SignInForm: FC<SignInFormProps> = ({
    onSignIn,
    children,
}) => {
    console.log('[SignInForm] renders');

    // Translation provider.
    const intl = useIntl();

    // Get user management functions.
    const { signIn, user_name } = useSecMaContext();

    // The callback used to validate the form.
    const validate = useCallback((values: SignInFormState) => {
        // Accumulate errors here.
        const result: Record<string, string> = {};

        // Validate the username.
        if (!values.username) {
            result.username = intl.formatMessage({
                id: 'secma-react.email.errRequired',
                defaultMessage: 'The email is required.',
            });
        } else if (values.username.length < 3) {
            result.username = intl.formatMessage({
                id: 'secma-react.email.errTooShort',
                defaultMessage: 'The email is too short.',
            });
        } else if (values.username.length > 255) {
            result.username = intl.formatMessage({
                id: 'secma-react.email.errTooLong',
                defaultMessage: 'The email is too long (255 characters ' +
                    'is the limit).',
            });
        }

        // Validate the password.
        if (!values.password) {
            result.password = intl.formatMessage({
                id: 'secma-react.password.errRequired',
                defaultMessage: 'The password is required.',
            });
        } else if (values.password.length < 8) {
            result.password = intl.formatMessage({
                id: 'secma-react.password.errTooShort',
                defaultMessage: 'The password is too short.',
            });
        } else if (values.password.length > 255) {
            result.password = intl.formatMessage({
                id: 'secma-react.password.errTooLong',
                defaultMessage: 'The password is too long (255 characters ' +
                    'is the limit).',
            });
        } else if (!/[a-z]/.test(values.password)) {
            result.password = intl.formatMessage({
                id: 'secma-react.password.errNoLower',
                defaultMessage: 'The password must contain at least one ' +
                    'lowercase letter.',
            });
        } else if (!/[A-Z]/.test(values.password)) {
            result.password = intl.formatMessage({
                id: 'secma-react.password.errNoUpper',
                defaultMessage: 'The password must contain at least one ' +
                    'uppercase letter.',
            });
        } else if (!/[0-9]/.test(values.password)) {
            result.password = intl.formatMessage({
                id: 'secma-react.password.errNoDigit',
                defaultMessage: 'The password must contain at least one ' +
                    'digit.',
            });
        } else if (!/[^a-zA-Z0-9]/.test(values.password)) {
            result.password = intl.formatMessage({
                id: 'secma-react.password.errNoSpecial',
                defaultMessage: 'The password must contain at least one ' +
                    'special character.',
            });
        }

        console.log('[SignInForm] validation errors %O', result);
        return result;
    }, [intl]);

    // The callback used to submit the form.
    const submit = useCallback((values: SignInFormState) => {
        console.log('[SignInForm] Sign in %O', values);
        signIn(values.username, values.password);
        // TODO: Handle remember me by using a refresh token.
    }, [signIn]);

    // Inform the parent if the user was signed in.
    useEffect(() => {
        if (onSignIn && user_name) {
            console.log('[SignInForm] onSignIn Callback triggered');
            onSignIn();
        }
    }, [onSignIn, user_name]);


    // Render the form.
    return (
        <Form<SignInFormState>
            onSubmit={submit}
            initialValues={initialValues}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    {children}
                </form>
            )}
        />
    )
}

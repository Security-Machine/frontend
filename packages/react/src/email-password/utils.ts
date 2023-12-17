import { IntlShape } from "react-intl"


/**
 * Check if the email is valid.
 */
export const checkPassword = (password: string, intl: IntlShape) => {
    let error: string | undefined = undefined;
    if (!password) {
        error = intl.formatMessage({
            id: 'secma-react.password.errRequired',
            defaultMessage: 'The password is required.',
        });
    } else if (password.length < 8) {
        error = intl.formatMessage({
            id: 'secma-react.password.errTooShort',
            defaultMessage: 'The password is too short.',
        });
    } else if (password.length > 255) {
        error = intl.formatMessage({
            id: 'secma-react.password.errTooLong',
            defaultMessage: 'The password is too long (255 characters ' +
                'is the limit).',
        });
    } else if (!/[a-z]/.test(password)) {
        error = intl.formatMessage({
            id: 'secma-react.password.errNoLower',
            defaultMessage: 'The password must contain at least one ' +
                'lowercase letter.',
        });
    } else if (!/[A-Z]/.test(password)) {
        error = intl.formatMessage({
            id: 'secma-react.password.errNoUpper',
            defaultMessage: 'The password must contain at least one ' +
                'uppercase letter.',
        });
    } else if (!/[0-9]/.test(password)) {
        error = intl.formatMessage({
            id: 'secma-react.password.errNoDigit',
            defaultMessage: 'The password must contain at least one ' +
                'digit.',
        });
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
        error = intl.formatMessage({
            id: 'secma-react.password.errNoSpecial',
            defaultMessage: 'The password must contain at least one ' +
                'special character.',
        });
    }
    return error;
}

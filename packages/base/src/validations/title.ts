import { IntlShape } from "react-intl";

/**
 * Check a title for validity.
 *
 * @param title The string to check.
 * @param formatMessage The formatMessage function from react-intl.
 * @param allowEmpty Whether an empty string is allowed.
 * @param minLength The minimum length of the string.
 * @param maxLength The maximum length of the string.
 * @returns The error message if the title is not valid,
 *  or an empty string if it is valid.
 */
export const validateTitle = (
    title: string | undefined,
    formatMessage: IntlShape["formatMessage"],
    allowEmpty: boolean = false,
    minLength: number = 0,
    maxLength: number = 255
): string => {
    if (!title) {
        if (allowEmpty) {
            return "";
        } else {
            return formatMessage({
                id: "secma-base.title.required",
                defaultMessage: "The title is required"
            });
        }
    }

    if (title.length < minLength) {
        return formatMessage({
            id: "secma-base.title.short",
            defaultMessage: (
                `The title is too short ({minLength} characters minimum)`
            )
        }, {
            minLength
        });
    } else if (title.length > maxLength) {
        return formatMessage({
            id: "secma-base.title.long",
            defaultMessage: (
                `The title is too long ({maxLength} characters maximum)`
            )
        }, {
            maxLength
        });
    }
    return "";
}

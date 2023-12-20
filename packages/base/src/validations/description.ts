import { IntlShape } from "react-intl";

/**
 * Check a description for validity.
 *
 * @param description The string to check.
 * @param formatMessage The formatMessage function from react-intl.
 * @param allowEmpty Whether an empty string is allowed.
 * @param minLength The minimum length of the string.
 * @param maxLength The maximum length of the string.
 * @returns The error message if the description is not valid,
 *  or an empty string if it is valid.
 */
export const validateDescription = (
    description: string | undefined,
    formatMessage: IntlShape["formatMessage"],
    allowEmpty: boolean = true,
    minLength: number = 0,
    maxLength: number = 255
): string => {
    if (!description) {
        if (allowEmpty) {
            return "";
        } else {
            return formatMessage({
                id: "secma-base.description.required",
                defaultMessage: "The description is required"
            });
        }
    }

    if (description.length < minLength) {
        return formatMessage({
            id: "secma-base.description.short",
            defaultMessage: (
                `The description is too short ({minLength} characters minimum)`
            )
        }, {
            minLength
        });
    } else if (description.length > maxLength) {
        return formatMessage({
            id: "secma-base.description.long",
            defaultMessage: (
                `The description is too long ({maxLength} characters maximum)`
            )
        }, {
            maxLength
        });
    }
    return "";
}

import { IntlShape } from "react-intl";

const slugRegEx = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Check a name for validity.
 *
 * @param name The name to check.
 * @param formatMessage The formatMessage function from react-intl.
 * @returns The error message if the name is not valid,
 *  or an empty string if it is valid.
 */
export const validateUserName = (
    name: string | undefined,
    formatMessage: IntlShape["formatMessage"]
): string => {
    if (!name) {
        return formatMessage({
            id: "secma-base.userName.required",
            defaultMessage: "The name is required"
        });
    } else if (name.length < 3) {
        return formatMessage({
            id: "secma-base.userName.short",
            defaultMessage: "The name is too short (3 characters minimum)"
        });
    } else if (name.length > 255) {
        return formatMessage({
            id: "secma-base.userName.long",
            defaultMessage: "The name is too long (255 characters maximum)"
        });
    } else if (!slugRegEx.test(name)) {
        return formatMessage({
            id: "secma-base.userName.invalid",
            defaultMessage: (
                "The name can only contain lowercase letters (a-z), " +
                "numbers (0-9) and dashes (-)"
            )
        });
    }
    return "";
}

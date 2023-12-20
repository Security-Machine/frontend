import { IntlShape } from "react-intl";

const slugRegEx = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Check a slug for validity.
 *
 * @param slug The slug to check.
 * @param formatMessage The formatMessage function from react-intl.
 * @returns The error message if the slug is not valid,
 *  or an empty string if it is valid.
 */
export const validateSlug = (
    slug: string | undefined,
    formatMessage: IntlShape["formatMessage"]
): string => {
    if (!slug) {
        return formatMessage({
            id: "secma-base.slug.required",
            defaultMessage: "The slug is required"
        });
    } else if (slug.length < 3) {
        return formatMessage({
            id: "secma-base.slug.short",
            defaultMessage: "The slug is too short (3 characters minimum)"
        });
    } else if (slug.length > 255) {
        return formatMessage({
            id: "secma-base.slug.long",
            defaultMessage: "The slug is too long (255 characters maximum)"
        });
    } else if (!slugRegEx.test(slug)) {
        return formatMessage({
            id: "secma-base.slug.invalid",
            defaultMessage: (
                "The slug can only contain lowercase letters (a-z), " +
                "numbers (0-9) and dashes (-)"
            )
        });
    }
    return "";
}

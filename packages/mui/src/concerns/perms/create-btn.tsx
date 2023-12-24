import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { usePermListContext } from "@secma/react";
import Button, { ButtonProps } from "@mui/material/Button";


/**
 * The properties for the (@link CreatePermButton).
 */
export type CreatePermButtonProps = Omit<ButtonProps, "onClick">;


/**
 * The button that changes current mode to create a new perm.
 */
export const CreatePermButton: FC<CreatePermButtonProps> = ({
    ...rest
}) => {
    // Get information from list context.
    const {
        canCreate,
        beginCreate
    } = usePermListContext();

    // Nothing to do if we can't create.
    if (!canCreate) return null;
    return (
        <Button
            color="primary"
            variant="contained" {...rest}
            onClick={beginCreate}
        >
            <FormattedMessage
                id="secma-mui.perms.create.btn"
                defaultMessage="Create a New Perm"
            />
        </Button>
    )
}

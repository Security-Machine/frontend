import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useRoleListContext } from "@secma/react";
import Button, { ButtonProps } from "@mui/material/Button";


/**
 * The properties for the (@link CreateRoleButton).
 */
export type CreateRoleButtonProps = Omit<ButtonProps, "onClick">;


/**
 * The button that changes current mode to create a new role.
 */
export const CreateRoleButton: FC<CreateRoleButtonProps> = ({
    ...rest
}) => {
    // Get information from list context.
    const {
        canCreate,
        beginCreate
    } = useRoleListContext();

    // Nothing to do if we can't create.
    if (!canCreate) return null;
    return (
        <Button
            color="primary"
            variant="contained" {...rest}
            onClick={beginCreate}
        >
            <FormattedMessage
                id="secma-mui.roles.create.btn"
                defaultMessage="Create a New Role"
            />
        </Button>
    )
}

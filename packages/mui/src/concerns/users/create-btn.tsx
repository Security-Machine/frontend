import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useUserListContext } from "@secma/react";
import Button, { ButtonProps } from "@mui/material/Button";


/**
 * The properties for the (@link CreateUserButton).
 */
export type CreateUserButtonProps = Omit<ButtonProps, "onClick">;


/**
 * The button that changes current mode to create a new user.
 */
export const CreateUserButton: FC<CreateUserButtonProps> = ({
    ...rest
}) => {
    // Get information from list context.
    const {
        canCreate,
        beginCreate
    } = useUserListContext();

    // Nothing to do if we can't create.
    if (!canCreate) return null;
    return (
        <Button
            color="primary"
            variant="contained" {...rest}
            onClick={beginCreate}
        >
            <FormattedMessage
                id="secma-mui.users.create.btn"
                defaultMessage="Create a New User"
            />
        </Button>
    )
}

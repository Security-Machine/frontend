import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useAppListContext } from "@secma/react";
import Button, { ButtonProps } from "@mui/material/Button";



/**
 * The properties for the (@link CreateAppButton).
 */
export interface CreateAppButtonProps extends Omit<ButtonProps, "onClick"> {

}


/**
 * The button that changes current mode to create a new application.
 */
export const CreateAppButton: FC<CreateAppButtonProps> = ({
    ...rest
}) => {
    // Get information from list context.
    const {
        canCreate,
        beginCreate
    } = useAppListContext();

    // Nothing to do if we can't create.
    if (!canCreate) return null;
    return (
        <Button
            color="primary"
            variant="contained" {...rest}
            onClick={beginCreate}
        >
            <FormattedMessage
                id="secma-mui.applications.create.btn"
                defaultMessage="Create a New App"
            />
        </Button>
    )
}

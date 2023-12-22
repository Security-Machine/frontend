import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useTenantListContext } from "@secma/react";
import Button, { ButtonProps } from "@mui/material/Button";


/**
 * The properties for the (@link CreateTenantButton).
 */
export type CreateTenantButtonProps = Omit<ButtonProps, "onClick">;


/**
 * The button that changes current mode to create a new tenant.
 */
export const CreateTenantButton: FC<CreateTenantButtonProps> = ({
    ...rest
}) => {
    // Get information from list context.
    const {
        canCreate,
        beginCreate
    } = useTenantListContext();

    // Nothing to do if we can't create.
    if (!canCreate) return null;
    return (
        <Button
            color="primary"
            variant="contained" {...rest}
            onClick={beginCreate}
        >
            <FormattedMessage
                id="secma-mui.tenants.create.btn"
                defaultMessage="Create a New Tenant"
            />
        </Button>
    )
}

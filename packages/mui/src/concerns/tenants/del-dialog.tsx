import { FC } from "react";
import { FormattedMessage } from "react-intl";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TenantData } from "@secma/base";


/**
 * Properties for the {@link TenantConfirmDeleteDialog} component.
 */
export interface TenantConfirmDeleteDialogProps {

    /**
    * Is the dialog currently open?
    */
    open?: boolean;

    /**
    * The function to call when the user cancels the deletion.
    */
    onCancel?: () => void;

    /**
    * The function to call when the user confirms the deletion.
    */
    onConfirm?: () => void;

    /**
    * The tenant to delete.
    */
    record?: TenantData | string;
}


/**
 * A dialog that asks the user to confirm the deletion of a tenant.
 */
export const TenantConfirmDeleteDialog: FC<TenantConfirmDeleteDialogProps> = ({
    open = true,
    onCancel,
    onConfirm,
    record
}) => record ? (
    <Dialog open={open} onClose={onCancel}>
        <DialogTitle id="alert-dialog-title">
            <FormattedMessage
                id="secma-mui.tenants.del.dialog.t"
                defaultMessage="Delete tenant?"
            />
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <FormattedMessage
                    id="secma-mui.tenants.del.dialog.d"
                    defaultMessage={
                        "Are you sure you want to delete the " +
                        "tenant {tenant}?"
                    }
                    values={{
                        tenant: (
                            typeof record === "string"
                                ? record
                                : (record.title || record.slug)
                        ),
                    }}
                />
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onCancel} autoFocus>
                <FormattedMessage
                    id="secma-mui.cancel"
                    defaultMessage="Cancel"
                />
            </Button>
            <Button onClick={onConfirm} color='error'>
                <FormattedMessage
                    id="secma-mui.delete"
                    defaultMessage="Delete"
                />
            </Button>
        </DialogActions>
    </Dialog>
) : null;

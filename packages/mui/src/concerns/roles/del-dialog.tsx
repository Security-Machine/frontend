import { FC } from "react";
import { FormattedMessage } from "react-intl";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { RoleData } from "@secma/base";


/**
 * Properties for the {@link RoleConfirmDeleteDialog} component.
 */
export interface RoleConfirmDeleteDialogProps {

    /**
    * Is the dialog currently open?
    */
    open?: boolean;

    /**
    * The function to call when the role cancels the deletion.
    */
    onCancel?: () => void;

    /**
    * The function to call when the role confirms the deletion.
    */
    onConfirm?: () => void;

    /**
    * The role to delete.
    */
    record?: RoleData | string;
}


/**
 * A dialog that asks the role to confirm the deletion of a role.
 */
export const RoleConfirmDeleteDialog: FC<RoleConfirmDeleteDialogProps> = ({
    open = true,
    onCancel,
    onConfirm,
    record
}) => record ? (
    <Dialog open={open} onClose={onCancel}>
        <DialogTitle id="alert-dialog-title">
            <FormattedMessage
                id="secma-mui.roles.del.dialog.t"
                defaultMessage="Delete role?"
            />
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <FormattedMessage
                    id="secma-mui.roles.del.dialog.d"
                    defaultMessage={
                        "Are you sure you want to delete the " +
                        "role {role}?"
                    }
                    values={{
                        role: (
                            typeof record === "string"
                                ? record
                                : (record.name)
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

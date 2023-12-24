import { FC } from "react";
import { FormattedMessage } from "react-intl";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { PermData } from "@secma/base";


/**
 * Properties for the {@link PermConfirmDeleteDialog} component.
 */
export interface PermConfirmDeleteDialogProps {

    /**
    * Is the dialog currently open?
    */
    open?: boolean;

    /**
    * The function to call when the perm cancels the deletion.
    */
    onCancel?: () => void;

    /**
    * The function to call when the perm confirms the deletion.
    */
    onConfirm?: () => void;

    /**
    * The perm to delete.
    */
    record?: PermData | string;
}


/**
 * A dialog that asks the perm to confirm the deletion of a perm.
 */
export const PermConfirmDeleteDialog: FC<PermConfirmDeleteDialogProps> = ({
    open = true,
    onCancel,
    onConfirm,
    record
}) => record ? (
    <Dialog open={open} onClose={onCancel}>
        <DialogTitle id="alert-dialog-title">
            <FormattedMessage
                id="secma-mui.perms.del.dialog.t"
                defaultMessage="Delete perm?"
            />
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <FormattedMessage
                    id="secma-mui.perms.del.dialog.d"
                    defaultMessage={
                        "Are you sure you want to delete the " +
                        "perm {perm}?"
                    }
                    values={{
                        perm: (
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

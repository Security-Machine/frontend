import { FC } from "react";
import { FormattedMessage } from "react-intl";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { UserData } from "@secma/base";


/**
 * Properties for the {@link UserConfirmDeleteDialog} component.
 */
export interface UserConfirmDeleteDialogProps {

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
    * The user to delete.
    */
    record?: UserData | string;
}


/**
 * A dialog that asks the user to confirm the deletion of a user.
 */
export const UserConfirmDeleteDialog: FC<UserConfirmDeleteDialogProps> = ({
    open = true,
    onCancel,
    onConfirm,
    record
}) => record ? (
    <Dialog open={open} onClose={onCancel}>
        <DialogTitle id="alert-dialog-title">
            <FormattedMessage
                id="secma-mui.users.del.dialog.t"
                defaultMessage="Delete user?"
            />
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <FormattedMessage
                    id="secma-mui.users.del.dialog.d"
                    defaultMessage={
                        "Are you sure you want to delete the " +
                        "user {user}?"
                    }
                    values={{
                        user: (
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

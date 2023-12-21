import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ApplicationData } from "@secma/base";
import { FC } from "react";
import { FormattedMessage } from "react-intl";


/**
 * Properties for the {@link AmmConfirmDeleteDialog} component.
 */
export interface AmmConfirmDeleteDialogProps {

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
    * The application to delete.
    */
    record?: ApplicationData | string;
}


/**
 * A dialog that asks the user to confirm the deletion of an application.
 */
export const AmmConfirmDeleteDialog: FC<AmmConfirmDeleteDialogProps> = ({
    open = true,
    onCancel,
    onConfirm,
    record
}) => record ? (
    <Dialog open={open} onClose={onCancel}>
        <DialogTitle id="alert-dialog-title">
            <FormattedMessage
                id="secma-mui.apps.del.dialog.t"
                defaultMessage="Delete application?"
            />
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <FormattedMessage
                    id="secma-mui.apps.del.dialog.d"
                    defaultMessage={
                        "Are you sure you want to delete the " +
                        "application {appName}?"
                    }
                    values={{
                        appName: (
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

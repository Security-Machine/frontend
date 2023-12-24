import { FC } from "react";
import { FormattedMessage } from "react-intl";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import {
    PermEditController, PermEditDialogChildProps
} from "@secma/react";

import { PermEditor } from "./editor";
import { StandardFormActions } from "../../components/form-actions";


/**
 * Properties for the {@link PermEditDialog} component.
 */
export interface PermEditDialogProps
    extends Partial<PermEditDialogChildProps> {

    /**
     * Is the dialog currently open?
     */
    open?: boolean;
}


/**
 * The dialog used to edit or create a perm.
 */
export const PermEditDialog: FC<PermEditDialogProps> = ({
    onCancel,
    open = true,
    initialValues,
    onSuccess,
    appSlug,
    tenSlug,
}) => {
    return (
        <Dialog onClose={onCancel} open={open}>
            <PermEditController
                initialValues={initialValues}
                onSuccess={onSuccess}
                appSlug={appSlug!}
                tenSlug={tenSlug!}
            >
                <DialogTitle>
                    {initialValues ? (
                        <FormattedMessage
                            key="edit"
                            id="secma-mui.perms.dialog.edit"
                            defaultMessage="Edit the {perm} perm"
                            values={{ perm: initialValues.name }}
                        />
                    ) : (
                        <FormattedMessage
                            key="create"
                            id="secma-mui.perms.dialog.add"
                            defaultMessage="Create a new perm"
                        />
                    )}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        <FormattedMessage
                            id="secma-mui.perms.dialog.d"
                            defaultMessage={
                                "At the very minimum a perm needs a " +
                                "unique slug. You may also provide a title " +
                                "and a description."
                            }
                        />
                    </Typography>
                    <PermEditor />
                </DialogContent>
                <StandardFormActions onCancel={onCancel} />
            </PermEditController>
        </Dialog>
    );
}

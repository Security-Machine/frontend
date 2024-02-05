import { FC } from "react";
import { FormattedMessage } from "react-intl";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import {
    UserEditController, UserEditDialogChildProps
} from "@secma/react";
import { StandardFormActions } from "@vebgen/mui-rff-buttons";

import { UserEditor } from "./editor";


/**
 * Properties for the {@link UserEditDialog} component.
 */
export interface UserEditDialogProps
    extends Partial<UserEditDialogChildProps> {

    /**
     * Is the dialog currently open?
     */
    open?: boolean;
}


/**
 * The dialog used to edit or create a user.
 */
export const UserEditDialog: FC<UserEditDialogProps> = ({
    onCancel,
    open = true,
    initialValues,
    onSuccess,
    appSlug,
    tenSlug,
}) => {
    return (
        <Dialog onClose={onCancel} open={open}>
            <UserEditController
                initialValues={initialValues}
                onSuccess={onSuccess}
                appSlug={appSlug!}
                tenSlug={tenSlug!}
            >
                <DialogTitle>
                    {initialValues ? (
                        <FormattedMessage
                            key="edit"
                            id="secma-mui.users.dialog.edit"
                            defaultMessage="Edit the {user} user"
                            values={{ user: initialValues.name }}
                        />
                    ) : (
                        <FormattedMessage
                            key="create"
                            id="secma-mui.users.dialog.add"
                            defaultMessage="Create a new user"
                        />
                    )}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        <FormattedMessage
                            id="secma-mui.users.dialog.d"
                            defaultMessage={
                                "At the very minimum a user needs a " +
                                "unique slug. You may also provide a title " +
                                "and a description."
                            }
                        />
                    </Typography>
                    <UserEditor />
                </DialogContent>
                <StandardFormActions onCancel={onCancel} />
            </UserEditController>
        </Dialog>
    );
}

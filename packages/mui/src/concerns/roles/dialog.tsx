import { FC } from "react";
import { FormattedMessage } from "react-intl";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import {
    RoleEditController, RoleEditDialogChildProps
} from "@secma/react";
import { StandardFormActions } from "@vebgen/mui-rff-buttons";

import { RoleEditor } from "./editor";


/**
 * Properties for the {@link RoleEditDialog} component.
 */
export interface RoleEditDialogProps
    extends Partial<RoleEditDialogChildProps> {

    /**
     * Is the dialog currently open?
     */
    open?: boolean;
}


/**
 * The dialog used to edit or create a role.
 */
export const RoleEditDialog: FC<RoleEditDialogProps> = ({
    onCancel,
    open = true,
    initialValues,
    onSuccess,
    appSlug,
    tenSlug,
}) => {
    return (
        <Dialog onClose={onCancel} open={open}>
            <RoleEditController
                initialValues={initialValues}
                onSuccess={onSuccess}
                appSlug={appSlug!}
                tenSlug={tenSlug!}
            >
                <DialogTitle>
                    {initialValues ? (
                        <FormattedMessage
                            key="edit"
                            id="secma-mui.roles.dialog.edit"
                            defaultMessage="Edit the {role} role"
                            values={{ role: initialValues.name }}
                        />
                    ) : (
                        <FormattedMessage
                            key="create"
                            id="secma-mui.roles.dialog.add"
                            defaultMessage="Create a new role"
                        />
                    )}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        <FormattedMessage
                            id="secma-mui.roles.dialog.d"
                            defaultMessage={
                                "At the very minimum a role needs a " +
                                "unique slug. You may also provide a title " +
                                "and a description."
                            }
                        />
                    </Typography>
                    <RoleEditor />
                </DialogContent>
                <StandardFormActions onCancel={onCancel} />
            </RoleEditController>
        </Dialog>
    );
}

import { FC } from "react";
import { FormattedMessage } from "react-intl";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import {
    TenantEditController, TenantEditDialogChildProps
} from "@secma/react";
import { StandardFormActions } from "@vebgen/mui-rff-buttons";

import { TenantEditor } from "./editor";


/**
 * Properties for the {@link TenantEditDialog} component.
 */
export interface TenantEditDialogProps
    extends Partial<TenantEditDialogChildProps> {

    /**
     * Is the dialog currently open?
     */
    open?: boolean;
}


/**
 * The dialog used to edit or create a tenant.
 */
export const TenantEditDialog: FC<TenantEditDialogProps> = ({
    onCancel,
    open = true,
    initialValues,
    onSuccess,
    appSlug,
}) => {
    return (
        <Dialog onClose={onCancel} open={open}>
            <TenantEditController
                initialValues={initialValues}
                onSuccess={onSuccess}
                appSlug={appSlug!}
            >
                <DialogTitle>
                    {initialValues ? (
                        <FormattedMessage
                            key="edit"
                            id="secma-mui.tenants.dialog.edit"
                            defaultMessage="Edit the {tenant} tenant"
                            values={{ tenant: initialValues.slug }}
                        />
                    ) : (
                        <FormattedMessage
                            key="create"
                            id="secma-mui.tenants.dialog.add"
                            defaultMessage="Create a new tenant"
                        />
                    )}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        <FormattedMessage
                            id="secma-mui.tenants.dialog.d"
                            defaultMessage={
                                "At the very minimum a tenant needs a " +
                                "unique slug. You may also provide a title " +
                                "and a description."
                            }
                        />
                    </Typography>
                    <TenantEditor />
                </DialogContent>
                <StandardFormActions onCancel={onCancel} />
            </TenantEditController>
        </Dialog>
    );
}

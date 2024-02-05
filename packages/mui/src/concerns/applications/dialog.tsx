import { FC } from "react";
import { FormattedMessage } from "react-intl";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { AppEditController, AppEditDialogChildProps } from "@secma/react";
import { StandardFormActions } from "@vebgen/mui-rff-buttons";

import { AppEditor } from "./editor";


/**
 * Properties for the {@link AppEditDialog} component.
 */
export interface AppEditDialogProps extends Partial<AppEditDialogChildProps> {

    /**
     * Is the dialog currently open?
     */
    open?: boolean;
}


/**
 * The dialog used to edit or create an application.
 */
export const AppEditDialog: FC<AppEditDialogProps> = ({
    onCancel,
    open = true,
    initialValues,
    onSuccess,
}) => {
    return (
        <Dialog onClose={onCancel} open={open}>
            <AppEditController
                initialValues={initialValues}
                onSuccess={onSuccess}
            >
                <DialogTitle>
                    {initialValues ? (
                        <FormattedMessage
                            key="edit"
                            id="secma-mui.apps.dialog.edit"
                            defaultMessage="Edit the {app} application"
                            values={{ app: initialValues.slug }}
                        />
                    ) : (
                        <FormattedMessage
                            key="create"
                            id="secma-mui.apps.dialog.add"
                            defaultMessage="Create a new application"
                        />
                    )}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        <FormattedMessage
                            id="secma-mui.apps.dialog.d"
                            defaultMessage={
                                "At the very minimum an application needs a " +
                                "unique slug. You may also provide a title " +
                                "and a description."
                            }
                        />
                    </Typography>
                    <AppEditor />
                </DialogContent>
                <StandardFormActions onCancel={onCancel} />
            </AppEditController>
        </Dialog>
    );
}

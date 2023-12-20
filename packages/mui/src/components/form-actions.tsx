import { FC } from "react";
import { FormattedMessage } from "react-intl";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from '@mui/icons-material/Close';

import { ResetButton } from "./reset-btn";
import { SubmitButton } from "./submit-btn";


// TODO: Move to a separate package in mui-rff namespace.


/**
 * Properties for the {@link StandardFormActions} component.
 */
export interface StandardFormActionsProps {
    /**
     * The function to call when the user clicks the cancel button.
     */
    onCancel?: () => void;
}


/**
 * A standard set of form actions: cancel, reset and submit.
 */
export const StandardFormActions: FC<StandardFormActionsProps> = ({
    onCancel
}) => (
    <DialogActions>
        {onCancel ? (
            <Button
                color="error"
                onClick={onCancel}
                startIcon={<CloseIcon />}
            >
                <FormattedMessage
                    id="secma-mui.cancel"
                    defaultMessage="Cancel"
                />
            </Button>
        ) : null}
        <ResetButton />
        <SubmitButton />
    </DialogActions>
);

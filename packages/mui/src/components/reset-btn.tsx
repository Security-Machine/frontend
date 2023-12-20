import React from 'react';
import { FormattedMessage } from 'react-intl';
import UndoIcon from '@mui/icons-material/Undo';
import { useForm, useFormState } from 'react-final-form';
import Button from '@mui/material/Button';

// TODO: Move to a separate package in mui-rff namespace.

/**
 * A button that allows resetting the form to the initial state.
 */
export const ResetButton = () => {
    const state = useFormState();
    const form = useForm();
    console.log("[ResetButton] state %O", state);
    return (
        <Button
            type="submit"
            color="secondary"
            startIcon={<UndoIcon />}
            onClick={() => form.reset(state.initialValues)}
            disabled={
                state.submitting || state.pristine
            }
        >
            <FormattedMessage
                id="secma-mui.reset"
                defaultMessage="Reset"
            />
        </Button>
    )
}

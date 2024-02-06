import { FC } from "react";
import { SignInForm } from "@secma/react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { FormattedMessage } from "react-intl";

import {
    ErrorMessage,
    LostPasswordLink, MainButton, PageTitle, PasswordField,
    RememberField, SignInMuiFormProps, TheLink, UsernameField
} from "./common";
import { useFormState } from "react-final-form";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";


export const SignUpInner: FC = () => {
    const {
        submitting, submitError
    } = useFormState();
    return (
        <Container maxWidth="xs">
            <PageTitle>
                <FormattedMessage
                    id="secma-mui.signUp.title"
                    defaultMessage="Sign Up"
                />
            </PageTitle>
            <UsernameField />
            <PasswordField />
            <RememberField />
            <ErrorMessage submitError={submitError} />
            <MainButton loading={submitting}>
                <FormattedMessage
                    id="secma-mui.signUp.button"
                    defaultMessage="Sign Up"
                />
            </MainButton>
            <Box display="flex">
                <Box padding={1}>
                    <LostPasswordLink />
                </Box>
                <Box padding={1}>
                    <TheLink to="../sign-in">
                        <FormattedMessage
                            id="secma-mui.signUp.signIn"
                            defaultMessage={
                                "Already have an account? Sign In"
                            }
                        />
                    </TheLink>
                </Box>
            </Box>
        </Container>
    );
}


/**
 * The form for signing up.
 */
export const SignUpMuiForm: FC<SignInMuiFormProps> = (props) => {
    return (
        <SignInForm isExisting={false} {...props}>
            <SignUpInner />
        </SignInForm >
    )
}

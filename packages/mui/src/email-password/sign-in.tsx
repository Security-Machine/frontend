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
import { Box, Typography } from "@mui/material";


export const SignInInner: FC = () => {
    const {
        submitting, submitError
    } = useFormState();
    return (
        <Container maxWidth="xs">
            <PageTitle>
                <FormattedMessage
                    id="secma-mui.signIn.title"
                    defaultMessage="Sign in"
                />
            </PageTitle>
            <UsernameField />
            <PasswordField />
            <RememberField />
            <ErrorMessage submitError={submitError} />
            <MainButton loading={submitting}>
                <FormattedMessage
                    id="secma-mui.signIn.button"
                    defaultMessage="Sign in"
                />
            </MainButton>
            <Box display="flex">
                <Box padding={1}>
                    <LostPasswordLink />
                </Box>
                <Box padding={1}>
                <TheLink to="../sign-up">
                        <FormattedMessage
                            id="secma-mui.signIn.signUp"
                            defaultMessage={
                                "Don't have an account? Sign Up"
                            }
                        />
                    </TheLink>
                </Box>
            </Box>
        </Container>
    );
}


/**
 * The form for signing in.
 */
export const SignInMuiForm: FC<SignInMuiFormProps> = (props) => (
    <SignInForm isExisting={true} {...props}>
        <SignInInner />
    </SignInForm >
)

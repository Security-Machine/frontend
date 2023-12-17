import { FC } from "react";
import { SignInForm } from "@secma/react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { FormattedMessage, useIntl } from "react-intl";
import {
    LostPasswordLink, MainButton, PageTitle, PasswordField,
    RememberField, SignInMuiFormProps, TheLink, UsernameField
} from "./common";


/**
 * The form for signing in.
 */
export const SignInMuiForm: FC<SignInMuiFormProps> = (props) => (
    <SignInForm isExisting={true} {...props}>
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
            <MainButton>
                <FormattedMessage
                    id="secma-mui.signIn.button"
                    defaultMessage="Sign in"
                />
            </MainButton>
            <Grid container>
                <Grid item xs>
                    <LostPasswordLink />
                </Grid>
                <Grid item>
                    <TheLink to="../sign-up">
                        <FormattedMessage
                            id="secma-mui.signIn.signUp"
                            defaultMessage={
                                "Don't have an account? Sign Up"
                            }
                        />
                    </TheLink>
                </Grid>
            </Grid>
        </Container>
    </SignInForm >
)

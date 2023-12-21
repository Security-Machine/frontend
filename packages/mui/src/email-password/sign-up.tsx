import { FC } from "react";
import { SignInForm } from "@secma/react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { FormattedMessage } from "react-intl";

import {
    LostPasswordLink, MainButton, PageTitle, PasswordField,
    RememberField, SignInMuiFormProps, TheLink, UsernameField
} from "./common";


/**
 * The form for signing up.
 */
export const SignUpMuiForm: FC<SignInMuiFormProps> = (props) => {
    return (
        <SignInForm isExisting={true} {...props}>
            <Container maxWidth="xs">
                <PageTitle>
                    <FormattedMessage
                        id="secma-mui.signUp.title"
                        defaultMessage="Sign in"
                    />
                </PageTitle>
                <UsernameField />
                <PasswordField />
                <RememberField />
                <MainButton>
                    <FormattedMessage
                        id="secma-mui.signUp.button"
                        defaultMessage="Sign in"
                    />
                </MainButton>
                <Grid container>
                    <Grid item xs>
                        <LostPasswordLink />
                    </Grid>
                    <Grid item>
                        <TheLink to="../sign-in">
                            <FormattedMessage
                                id="secma-mui.signUp.signIn"
                                defaultMessage={
                                    "Already have an account? Sign In"
                                }
                            />
                        </TheLink>
                    </Grid>
                </Grid>
            </Container>
        </SignInForm >
    )
}

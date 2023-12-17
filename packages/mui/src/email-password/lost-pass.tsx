import { FC } from "react";
import { FormattedMessage } from "react-intl";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { LostPasswordForm } from "@secma/react";

import { MainButton, PageTitle, TheLink, UsernameField } from "./common";


/**
 * The form for signing in.
 */
export const LostPasswordMuiForm: FC = () => (
    <LostPasswordForm>
        <Container maxWidth="xs">
            <PageTitle>
                <FormattedMessage
                    id="secma-mui.lost.title"
                    defaultMessage="Recover password"
                />
            </PageTitle>
            <UsernameField />
            <MainButton>
                <FormattedMessage
                    id="secma-mui.lost.button"
                    defaultMessage="Send email"
                />
            </MainButton>
            <Grid container>
                <Grid item xs>
                    <TheLink to="../sign-up">
                        <FormattedMessage
                            id="secma-mui.lost.signUp"
                            defaultMessage="Sign Up"
                        />
                    </TheLink>
                </Grid>
                <Grid item xs>
                    <TheLink to="../sign-in">
                        <FormattedMessage
                            id="secma-mui.lost.signIn"
                            defaultMessage="Sign In"
                        />
                    </TheLink>
                </Grid>
            </Grid>
        </Container>
    </LostPasswordForm>
)

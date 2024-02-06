import { FC } from "react";
import { FormattedMessage } from "react-intl";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { LostPasswordForm } from "@secma/react";

import { MainButton, PageTitle, TheLink, UsernameField } from "./common";
import { Box } from "@mui/material";


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
            <Box
                display="flex"
                alignContent="center"
                justifyContent="space-evenly"
                alignItems="center"
            >
                <Box padding={1}>
                    <TheLink to="../sign-up">
                        <FormattedMessage
                            id="secma-mui.lost.signUp"
                            defaultMessage="Sign Up"
                        />
                    </TheLink>
                </Box>
                <Box padding={1}>
                    <TheLink to="../sign-in">
                        <FormattedMessage
                            id="secma-mui.lost.signIn"
                            defaultMessage="Sign In"
                        />
                    </TheLink>
                </Box>
            </Box>
        </Container>
    </LostPasswordForm>
)

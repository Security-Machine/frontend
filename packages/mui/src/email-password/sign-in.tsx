import { FC } from "react";
import { SignInForm } from "@secma/react";
import type { SignInFormProps } from "@secma/react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Text } from "@vebgen/mui-rff-text"
import { Checkboxes } from "@vebgen/mui-rff-checkboxes";
import { useIntl } from "react-intl";


/**
 * The form for signing in.
 */
export const SignInMuiForm: FC<Omit<SignInFormProps, "children">> = (props) => {
    const intl = useIntl();
    return (
        <SignInForm {...props}>
            <Container>
                <Typography component="h1" variant="h5">
                    {intl.formatMessage({
                        id: "secma-mui.signIn.title",
                        defaultMessage: "Sign in",
                    })}
                </Typography>
                <Text
                    name="username"
                    label={intl.formatMessage({
                        id: "secma-mui.signIn.username",
                        defaultMessage: "Username or email",
                    })}
                    required
                    autoFocus
                />
                <Text
                    name="password"
                    label={intl.formatMessage({
                        id: "secma-mui.signIn.password",
                        defaultMessage: "Password",
                    })}
                    required
                    type="password"
                />
                <Checkboxes
                    name="rememberMe"
                    data={{
                        label: intl.formatMessage({
                            id: "secma-mui.signIn.rememberMe",
                            defaultMessage: "Remember me",
                        })
                    }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {intl.formatMessage({
                        id: "secma-mui.signIn.button",
                        defaultMessage: "Sign in",
                    })}
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            {intl.formatMessage({
                                id: "secma-mui.signIn.forgotPassword",
                                defaultMessage: "Forgot password?",
                            })}
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {intl.formatMessage({
                                id: "secma-mui.signIn.signUp",
                                defaultMessage: "Don't have an account? Sign Up",
                            })}
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </SignInForm>
    )
}
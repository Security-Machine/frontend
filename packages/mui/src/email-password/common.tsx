import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { Text } from "@vebgen/mui-rff-text"
import { Checkboxes } from "@vebgen/mui-rff-checkboxes";
import { FormattedMessage } from "react-intl";
import Button from "@mui/material/Button";
import MuiLink from "@mui/material/Link";
import { Link } from "react-router-dom";
import { SignInFormProps } from "@secma/react";


// The style to apply to the title.
const sxTitle = { mb: 2, mt: 3 };

// The styles to apply to each row.
const sxRow = {
    mb: 2,
    mt: 2,
};

// The styles to apply to the sign in button.
const sxSignInButton = { mt: 3, mb: 2 };


/**
 * The properties expected by the {@link SignInMuiForm} component.
 */
export type SignInMuiFormProps = Omit<
    SignInFormProps, "children" | "isExisting"
>


/**
 * The title of a page.
 */
export const PageTitle = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <Typography
            component="h1"
            variant="h5"
            sx={sxTitle}
        >
            {children}
        </Typography>
    );
}


/**
 * A text field.
 */
export const TheText = ({
    children,
    name
}: {
    children: ReactNode,
    name: string,
}) => (
    <Box sx={sxRow}>
        <Text
            name={name}
            label={children}
            required
            autoFocus
        />
    </Box>
);


/**
 * The field for a username.
 */
export const UsernameField = () => (
    <TheText name="username">
        <FormattedMessage
            id="secma-mui.signIn.username"
            defaultMessage="Username or email"
        />
    </TheText>
);


/**
 * The field for a password.
 */
export const PasswordField = () => (
    <Box sx={sxRow}>
        <Text
            name="password"
            label={<FormattedMessage
                id="secma-mui.signIn.password"
                defaultMessage="Password"
            />}
            required
            type="password"
        />
    </Box>
)


/**
 * The field for remembering the user.
 */
export const RememberField = () => (
    <Checkboxes
        name="rememberMe"
        data={{
            label: <FormattedMessage
                id="secma-mui.signIn.rememberMe"
                defaultMessage="Remember me"
            />
        }}
    />
);


/**
 * The action button.
 */
export const MainButton = ({
    children
}: {
    children: ReactNode
}) => (
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={sxSignInButton}
    >
        {children}
    </Button>
);


/**
 * A link.
 */
export const TheLink = ({
    children,
    to
}: {
    children: ReactNode,
    to: string
}) => (
    <MuiLink
        component={Link}
        relative="path"
        to={to}
        variant="body2"
    >
        {children}
    </MuiLink>
);


/**
 * The link to lost password link.
 */
export const LostPasswordLink = () => (
    <TheLink to="../lost-password">
        <FormattedMessage
            id="secma-mui.signIn.lostPassword"
            defaultMessage="Lost password?"
        />
    </TheLink>
);

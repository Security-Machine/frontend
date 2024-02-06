import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { Text, TextProps } from "@vebgen/mui-rff-text"
import { Checkboxes } from "@vebgen/mui-rff-checkboxes";
import { SignInFormProps } from "@secma/react";
import LoadingButton from '@mui/lab/LoadingButton';
import BackupIcon from '@mui/icons-material/Backup';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

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
    name,
    ...rest
}: Omit<TextProps, "label">) => (
    <Box sx={sxRow}>
        <Text
            name={name}
            label={children}
            {...rest}
        />
    </Box>
);


/**
 * The field for a username.
 */
export const UsernameField = () => (
    <TheText
        name="username"
        required
        autoFocus
        autoComplete="username"
    >
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
    <TheText
        name="password"
        required
        type="password"
        autoComplete="current-password"
    >
        <FormattedMessage
            id="secma-mui.signIn.password"
            defaultMessage="Password"
        />
    </TheText>
);


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
    loading = false,
    children
}: {
    loading?: boolean,
    children: ReactNode
}) => (
    <LoadingButton
        type="submit"
        loadingPosition="start"
        startIcon={<DoneOutlineIcon />}
        fullWidth
        variant="contained"
        sx={sxSignInButton}
        loading={loading}
    >
        {children}
    </LoadingButton>
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

const sxError = {
    display: 'flex',
    alignItems: 'center',
    alignContent: "center",
    justifyContent: "center",
    gap: "0.5rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
 };

/**
 * Prints the error message.
 */
export const ErrorMessage = ({
    submitError
}: {
    submitError: string | undefined
}) => {
    const [shown, setShown] = useState(false);

    useEffect(() => {
        if (submitError) {
            setShown(true);
        }
    }, [submitError]);

    if (!submitError || !shown) {
        return null;
    }

    return (
        <div style={sxError} onClick={() => {setShown(false)}}>
            <WarningAmberIcon color="error" />
            <Typography color="error" variant="body2">
                {submitError}
            </Typography>
        </div>
    );
}

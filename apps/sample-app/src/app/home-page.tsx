import { Box, Button, Typography } from "@mui/material";
import { useSecMaContext } from "@secma/react";


export const HomePage = () => {
    const {
        signIn,
        signOut,
        ...rest
    } = useSecMaContext();

    if (rest.user_name) {
        return (
            <Box>
                <Typography variant="h4">
                    Welcome {rest.user_name}
                </Typography>
                <Typography variant="body1">
                    You are signed in. This is the content of the use context:
                </Typography>
                <pre>
                    {JSON.stringify(rest, null, 2)}
                </pre>
                <Typography variant="body2">
                    To sign out click
                </Typography>
                <Button onClick={signOut}>here</Button>
            </Box>
        );
    } else {
        return (
            <div>
                <Typography variant="h4">
                    Home Page
                </Typography>
                <Typography variant="body1">
                    No user is signed in. You can use the navigation buttons
                    to sign in using one of the available methods.
                </Typography>
            </div>
        );

    }
}

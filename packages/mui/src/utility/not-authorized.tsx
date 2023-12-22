import { FC } from "react";
import { FormattedMessage } from "react-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export interface NotAuthorizedProps {
    /**
     * The permissions required to access this page.
     */
    permissions: string[];
}


/**
 * Error page to indicate to the user that they do not have
 * all required permissions to access this page.
 */
export const NotAuthorized: FC<NotAuthorizedProps> = () => (
    <Box m={3} p={3} width="100%">
        <Typography
            align="center"
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
        >
            <FormattedMessage
                id="secma-mui.error.notAuthorized.title"
                defaultMessage="Permission Denied"
            />
        </Typography>
        <Typography
            align="center"
            color="error"
        >
            <FormattedMessage
                id="secma-mui.error.notAuthorized.content"
                defaultMessage={
                    "The permissions required to access this " +
                    "content are not yet associated with your account."
                }
            />
        </Typography>
    </Box>
)


import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useRouteError } from "react-router-dom";
import { FormattedMessage } from "react-intl";


/**
 * Generic error page for the react router dom.
 */
export const Error404Page = () => {
    // Get the error from the router.
    const error: any = useRouteError();
    console.error(error);

    return (
        <Box m={3} p={3} width="100%">
            <Typography
                align="center"
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
            >
                <FormattedMessage
                    id="secma-admin.error.route.title"
                    defaultMessage="Unexpected Error"
                />
            </Typography>
            <Typography
                align="center"
                color="error"
            >
                {error.data || error.message || error.statusText}
            </Typography>
        </Box>
    )
}

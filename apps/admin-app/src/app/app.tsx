import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { SecMaAppController } from "@secma/react";
import { SnackbarProvider } from 'notistack';

import { muiTheme } from "./mui-theme";
import { appRouter } from "./router";


// Make sure that the environment variables are set.
if (!process.env.NX_AUTH_URL) {
    throw new Error("Missing environment variable NX_AUTH_URL");
}


/**
 * Main application component.
 */
export function App() {
    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <SnackbarProvider />
            <SecMaAppController
                loginPath="/admin/email-password/sign-in"
                apiUrl={process.env.NX_AUTH_URL!}
            >
                <RouterProvider router={appRouter} />
            </SecMaAppController>
        </ThemeProvider>
    );
}

export default App;

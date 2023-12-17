import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { muiTheme } from "./mui-theme";
import { appRouter } from "./router";
import { SecMaAppController, SecMaController } from "@secma/react";


/**
 * Main application component.
 */
export function App() {
    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <SecMaAppController loginPath="/admin/email-password/sign-in">
                <RouterProvider router={appRouter} />
            </SecMaAppController>
        </ThemeProvider>
    );
}

export default App;

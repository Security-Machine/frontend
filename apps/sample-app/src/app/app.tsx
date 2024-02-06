import { SecMaController } from "@secma/react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { SecMaAppController } from "@secma/react";
import { SnackbarProvider } from 'notistack';
import { createTheme } from '@mui/material/styles';
import { createBrowserRouter, } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { SignInMuiForm } from '@secma/mui';
import { SignUpMuiForm } from '@secma/mui';
import { LostPasswordMuiForm } from '@secma/mui';
import enMessages from '../../i18n/en.json';
import { AppLayout } from "./layout";
import { HomePage } from "./home-page";

const muiTheme = createTheme();


/**
 * Application router.
 */
export const appRouter: any = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            }, {
                path: "email-password/sign-in",
                element: <SignInMuiForm />,
            }, {
                path: "email-password/sign-up",
                element: <SignUpMuiForm />,
            }, {
                path: "email-password/lost-password",
                element: <LostPasswordMuiForm />,
            },
            // {
            //     path: "users/:userSlug",
            //     element: <UserDetailsPage />,
            // },
        ]
    }
]);


/**
 * The top level tree of the application.
 */
export function App() {
    return (
        <IntlProvider messages={enMessages} locale="en" onError={() => { }}>
            <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                <SnackbarProvider />
                <SecMaAppController
                    loginPath="/email-password/sign-in"
                    apiUrl={process.env.NX_AUTH_URL!}
                >
                    <SecMaController
                        appSlug="some-app"
                        tenantSlug="some-tenant"
                        withLocalStorage="secma-admin"
                    >
                        <RouterProvider router={appRouter} />
                    </SecMaController>
                </SecMaAppController>
            </ThemeProvider>
        </IntlProvider>
    );
}

export default App;

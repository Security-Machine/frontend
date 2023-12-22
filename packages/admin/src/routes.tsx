import { SecMaController } from "@secma/react";
import { MANAGEMENT_APP, MANAGEMENT_TENANT } from "@secma/base";
import {
    SignUpPage, LostPasswordPage, SignInPage
} from "./email-password";

import { AppLayout, Error404Page } from "./top-level";
import { AppListPage, AppDetailsPage } from "./apps";
import { TenantDetailsPage } from "./tenants";


/**
 * The routes for the admin app.
 */
export const adminRoutes = [
    {
        element: (
            <SecMaController
                appSlug={MANAGEMENT_APP}
                tenantSlug={MANAGEMENT_TENANT}
                withLocalStorage="secma-admin"
            >
                <AppLayout />
            </SecMaController>
        ),
        errorElement: <Error404Page />,
        children: [
            {
                path: "email-password/sign-in",
                element: <SignInPage />,
            }, {
                path: "email-password/sign-up",
                element: <SignUpPage />,
            }, {
                path: "email-password/lost-password",
                element: <LostPasswordPage />,
            }, {
                path: "apps/:appSlug/:tenSlug",
                element: <TenantDetailsPage />,
            }, {
                path: "apps/:slug",
                element: <AppDetailsPage />,
            }, {
                path: "apps",
                element: <AppListPage />,
            }
        ]
    }
];

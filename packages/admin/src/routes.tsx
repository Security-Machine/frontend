import { SecMaController } from "@secma/react";
import { SignInPage } from "./email-password/sign-in-page";
import { AppLayout, Error404Page } from "./top-level";


export const adminRoutes = [
    {
        element: (
            <SecMaController appSlug="" tenantSlug="">
                <AppLayout />
            </SecMaController>
        ),
        errorElement: <Error404Page />,
        children: [{
            path: "email-password/sign-in",
            element: <SignInPage />,
        }]
    }
];

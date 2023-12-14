import { Router, createBrowserRouter, } from "react-router-dom";
import { AppLayout, Error404Page } from "@secma/admin";


/**
 * Application router.
 */
export const appRouter: any = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <Error404Page />,
        children: []
    },
]);

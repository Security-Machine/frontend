import { Outlet, createBrowserRouter, } from "react-router-dom";
import { adminRoutes } from "@secma/admin";
import { HomePage } from "./home-page";


/**
 * Application router.
 */
export const appRouter: any = createBrowserRouter([
    {
        path: "/admin",
        element: <Outlet />,
        children: adminRoutes
    },
    {
        path: "/",
        element: <HomePage />,
    }
]);

import { Outlet, createBrowserRouter, } from "react-router-dom";
import { adminRoutes } from "@secma/admin";


/**
 * Application router.
 */
export const appRouter: any = createBrowserRouter([
    {
        path: "/admin",
        element: <Outlet />,
        children: adminRoutes
    },
]);

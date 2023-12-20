import { managementAppListPermission } from "@secma/base";
import { AppList, NotAuthorized } from "@secma/mui";
import { PageGuard } from "@secma/react";
import { FC } from "react";

const permissions = [managementAppListPermission];
const unauthorized = <NotAuthorized permissions={permissions}/>;

/**
 * The page that lists all the applications.
 */
export const ListPage: FC = () => {
    return (
        <PageGuard
            permissions={permissions}
            unauthorized={unauthorized}
        >
            <AppList />
        </PageGuard>
    )
};

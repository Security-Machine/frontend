import { FC } from "react";
import { managementAppListPermission } from "@secma/base";
import { AppList, NotAuthorized, PageHeader } from "@secma/mui";
import { PageGuard } from "@secma/react";
import { useIntl } from "react-intl";


const permissions = [managementAppListPermission];
const unauthorized = <NotAuthorized permissions={permissions} />;


/**
 * The page that lists all the applications.
 */
export const AppListPage: FC = () => {
    const { formatMessage } = useIntl();
    return (
        <PageGuard
            permissions={permissions}
            unauthorized={unauthorized}
        >
            <PageHeader
                title={formatMessage({
                    id: "secma-mui.apps.list.title",
                    defaultMessage: "Applications"
                })}
                description={formatMessage({
                    id: "secma-mui.apps.list.description",
                    defaultMessage: "These are all the applications that are " +
                    "available on this server. Note that the management " +
                    "application is the only one that cannot be deleted."
                })}
            />
            <AppList />
        </PageGuard>
    )
};

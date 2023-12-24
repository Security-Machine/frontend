import { FC, useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { managementTenantReadPermission } from "@secma/base";
import { NotAuthorized, PageHeader, PermList, RoleList, UserList } from "@secma/mui";
import { PageGuard, useTenantDetails } from "@secma/react";
import { useLocation, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { DateTime } from "luxon";
import SwipeableViews from 'react-swipeable-views';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Groups2Icon from '@mui/icons-material/Groups2';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";

const permissions = [managementTenantReadPermission];
const unauthorized = <NotAuthorized permissions={permissions} />;


// Properties for tabs.
function a11yTabProps(name: string) {
    return {
        id: `component-tab-${name}`,
        'aria-controls': `component-tabpanel-${name}`,
    };
}


interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    name: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, name, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${name}`}
            aria-labelledby={`full-width-tab-${name}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}


/**
 * The inner component of the tenant details page.
 */
export const TenantDetailsInner: FC = () => {
    // Translations.
    const { formatMessage } = useIntl();


    // MUI theme access.
    const theme = useTheme();


    // Get the tenant unique identifier from the URL.
    const { appSlug, tenSlug } = useParams<{
        appSlug: string,
        tenSlug: string,
    }>();
    console.log("[TenantDetailsPage] appSlug %O", appSlug);
    console.log("[TenantDetailsPage] tenSlug %O", tenSlug);


    // The link source may already have the tenant details.
    let { state } = useLocation();
    const hasState = state && typeof state === "object";
    console.log("[TenantDetailsPage] location state %O", state);


    // Read details about this tenant only if we don't have them already.
    const {
        result,
        error: detailsError,
    } = useTenantDetails(appSlug, tenSlug, !hasState);
    const tenantDetails = hasState ? {
        ...state,
        created: DateTime.fromISO(state.created),
        updated: DateTime.fromISO(state.updated),
    } : result;
    console.log(
        "[TenantDetailsPage] result %O, error %O",
        result, detailsError
    );


    // Show the error to the user.
    useEffect(() => {
        if (detailsError) {
            enqueueSnackbar(detailsError.message, {
                variant: "error",
            });
        }
    }, [detailsError]);


    // Current tab machinery.
    const [currentTab, setCurrentTab] = useState(0);
    const handleTabChange = useCallback((
        event: React.SyntheticEvent, newValue: number
    ) => {
        setCurrentTab(newValue);
    }, []);


    console.log("[TenantDetailsPage] tenantDetails %O", tenantDetails);
    return (
        <>
            <PageHeader
                title={
                    (tenantDetails && tenantDetails.title)
                        ? tenantDetails.title
                        : tenSlug!
                }
                description={
                    (tenantDetails && tenantDetails.description)
                        ? tenantDetails.description
                        : ""
                }
                created={tenantDetails ? tenantDetails.created : undefined}
                updated={tenantDetails ? tenantDetails.updated : undefined}
            />
            <Tabs
                value={currentTab}
                onChange={handleTabChange}
                aria-label={formatMessage({
                    id: "secma-admin.tenants.tabs.aria-label",
                    defaultMessage: "Tenant components",
                })}
                centered
            >
                <Tab
                    icon={<Groups2Icon />}
                    iconPosition="start"
                    label={formatMessage({
                        id: "secma-admin.tenants.tabs.users",
                        defaultMessage: "Users",
                    })}
                    {...a11yTabProps("users")}
                />
                <Tab
                    icon={<WorkspacesIcon />}
                    iconPosition="start"
                    label={formatMessage({
                        id: "secma-admin.tenants.tabs.roles",
                        defaultMessage: "Roles",
                    })}
                    {...a11yTabProps("roles")}
                />
                <Tab
                    icon={<LockPersonIcon />}
                    iconPosition="start"
                    label={formatMessage({
                        id: "secma-admin.tenants.tabs.perms",
                        defaultMessage: "Permissions",
                    })}
                    {...a11yTabProps("perms")}
                />
            </Tabs>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={currentTab}
                onChangeIndex={setCurrentTab}
            >
                <TabPanel
                    value={currentTab}
                    index={0}
                    dir={theme.direction}
                    name="users"
                >
                    <UserList appSlug={appSlug!} tenSlug={tenSlug!} />
                </TabPanel>
                <TabPanel
                    value={currentTab}
                    index={1}
                    dir={theme.direction}
                    name="roles"
                >
                    <RoleList appSlug={appSlug!} tenSlug={tenSlug!} />
                </TabPanel>
                <TabPanel
                    value={currentTab}
                    index={2}
                    dir={theme.direction}
                    name="perms"
                >
                    <PermList appSlug={appSlug!} tenSlug={tenSlug!} />
                </TabPanel>
            </SwipeableViews>
        </>
    );
}


/**
 * The page that shows the details about an tenant.
 */
export const TenantDetailsPage: FC = () => (
    <PageGuard
        permissions={permissions}
        unauthorized={unauthorized}
    >
        <TenantDetailsInner />
    </PageGuard>
);

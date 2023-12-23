import { FC, useEffect } from "react";
import { managementTenantReadPermission } from "@secma/base";
import { NotAuthorized, PageHeader } from "@secma/mui";
import { PageGuard, useTenantDetails } from "@secma/react";
import { useLocation, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { DateTime } from "luxon";


const permissions = [managementTenantReadPermission];
const unauthorized = <NotAuthorized permissions={permissions} />;


/**
 * The inner component of the tenant details page.
 */
export const TenantDetailsInner: FC = () => {
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
            {/* <UsersList tenSlug={tenSlug!} /> */}
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

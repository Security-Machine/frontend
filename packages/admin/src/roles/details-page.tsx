import { FC, useEffect } from "react";
import { managementRoleReadPermission } from "@secma/base";
import { NotAuthorized, PageHeader } from "@secma/mui";
import { PageGuard, useRoleDetails } from "@secma/react";
import { useLocation, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { DateTime } from "luxon";


const permissions = [managementRoleReadPermission];
const unauthorized = <NotAuthorized permissions={permissions} />;


/**
 * The inner component of the role details page.
 */
export const RoleDetailsInner: FC = () => {
    // Get the role unique identifier from the URL.
    const { appSlug, tenSlug, roleSlug } = useParams<{
        appSlug: string,
        tenSlug: string,
        roleSlug: string,
    }>();
    console.log("[RoleDetailsPage] appSlug %O", appSlug);
    console.log("[RoleDetailsPage] tenSlug %O", tenSlug);
    console.log("[RoleDetailsPage] roleSlug %O", roleSlug);


    // The link source may already have the role details.
    let { state } = useLocation();
    const hasState = state && typeof state === "object";
    console.log("[RoleDetailsPage] location state %O", state);


    // Read details about this role only if we don't have them already.
    const {
        result,
        error: detailsError,
    } = useRoleDetails(appSlug, tenSlug, roleSlug, !hasState);
    const roleDetails = hasState ? {
        ...state,
        created: DateTime.fromISO(state.created),
        updated: DateTime.fromISO(state.updated),
    } : result;
    console.log(
        "[RoleDetailsPage] result %O, error %O",
        result, detailsError
    );


    // Show the error to the role.
    useEffect(() => {
        if (detailsError) {
            enqueueSnackbar(detailsError.message, {
                variant: "error",
            });
        }
    }, [detailsError]);


    console.log("[RoleDetailsPage] roleDetails %O", roleDetails);
    return (
        <>
            <PageHeader
                title={
                    (roleDetails && roleDetails.name)
                        ? roleDetails.name
                        : roleSlug!
                }
                description={
                    (roleDetails && roleDetails.description)
                        ? roleDetails.description
                        : ""
                }
                created={roleDetails ? roleDetails.created : undefined}
                updated={roleDetails ? roleDetails.updated : undefined}
            />
            {/* <RolesList tenSlug={tenSlug!} /> */}
        </>
    );
}


/**
 * The page that shows the details about an role.
 */
export const RoleDetailsPage: FC = () => (
    <PageGuard
        permissions={permissions}
        unauthorized={unauthorized}
    >
        <RoleDetailsInner />
    </PageGuard>
);

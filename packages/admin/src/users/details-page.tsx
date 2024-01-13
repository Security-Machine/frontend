import { FC, useEffect } from "react";
import { managementUserReadPermission } from "@secma/base";
import { NotAuthorized, PageHeader } from "@secma/mui";
import { PageGuard, useUserDetails } from "@secma/react";
import { useLocation, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { DateTime } from "luxon";


const permissions = [managementUserReadPermission];
const unauthorized = <NotAuthorized permissions={permissions} />;


/**
 * The inner component of the user details page.
 */
export const UserDetailsInner: FC = () => {
    // Get the user unique identifier from the URL.
    const { appSlug, tenSlug, userSlug } = useParams<{
        appSlug: string,
        tenSlug: string,
        userSlug: string,
    }>();
    console.log("[UserDetailsPage] appSlug %O", appSlug);
    console.log("[UserDetailsPage] tenSlug %O", tenSlug);
    console.log("[UserDetailsPage] userSlug %O", userSlug);


    // The link source may already have the user details.
    const { state } = useLocation();
    const hasState = state && typeof state === "object";
    console.log("[UserDetailsPage] location state %O", state);


    // Read details about this user only if we don't have them already.
    const {
        result,
        error: detailsError,
    } = useUserDetails(appSlug, tenSlug, userSlug, !hasState);
    const userDetails = hasState ? {
        ...state,
        created: DateTime.fromISO(state.created),
        updated: DateTime.fromISO(state.updated),
    } : result;
    console.log(
        "[UserDetailsPage] result %O, error %O",
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


    console.log("[UserDetailsPage] userDetails %O", userDetails);
    return (
        <>
            <PageHeader
                title={
                    (userDetails && userDetails.name)
                        ? userDetails.name
                        : userSlug!
                }
                description={
                    (userDetails && userDetails.description)
                        ? userDetails.description
                        : ""
                }
                created={userDetails ? userDetails.created : undefined}
                updated={userDetails ? userDetails.updated : undefined}
            />
            {/* <UsersList tenSlug={tenSlug!} /> */}
        </>
    );
}


/**
 * The page that shows the details about an user.
 */
export const UserDetailsPage: FC = () => (
    <PageGuard
        permissions={permissions}
        unauthorized={unauthorized}
    >
        <UserDetailsInner />
    </PageGuard>
);

import { FC, useEffect } from "react";
import { managementPermReadPermission } from "@secma/base";
import { NotAuthorized, PageHeader } from "@secma/mui";
import { PageGuard, usePermDetails } from "@secma/react";
import { useLocation, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { DateTime } from "luxon";


const permissions = [managementPermReadPermission];
const unauthorized = <NotAuthorized permissions={permissions} />;


/**
 * The inner component of the perm details page.
 */
export const PermDetailsInner: FC = () => {
    // Get the perm unique identifier from the URL.
    const { appSlug, tenSlug, permSlug } = useParams<{
        appSlug: string,
        tenSlug: string,
        permSlug: string,
    }>();
    console.log("[PermDetailsPage] appSlug %O", appSlug);
    console.log("[PermDetailsPage] tenSlug %O", tenSlug);
    console.log("[PermDetailsPage] permSlug %O", permSlug);


    // The link source may already have the perm details.
    let { state } = useLocation();
    const hasState = state && typeof state === "object";
    console.log("[PermDetailsPage] location state %O", state);


    // Read details about this perm only if we don't have them already.
    const {
        result,
        error: detailsError,
    } = usePermDetails(appSlug, tenSlug, permSlug, !hasState);
    const permDetails = hasState ? {
        ...state,
        created: DateTime.fromISO(state.created),
        updated: DateTime.fromISO(state.updated),
    } : result;
    console.log(
        "[PermDetailsPage] result %O, error %O",
        result, detailsError
    );


    // Show the error to the perm.
    useEffect(() => {
        if (detailsError) {
            enqueueSnackbar(detailsError.message, {
                variant: "error",
            });
        }
    }, [detailsError]);


    console.log("[PermDetailsPage] permDetails %O", permDetails);
    return (
        <>
            <PageHeader
                title={
                    (permDetails && permDetails.name)
                        ? permDetails.name
                        : permSlug!
                }
                description={
                    (permDetails && permDetails.description)
                        ? permDetails.description
                        : ""
                }
                created={permDetails ? permDetails.created : undefined}
                updated={permDetails ? permDetails.updated : undefined}
            />
            {/* <PermsList tenSlug={tenSlug!} /> */}
        </>
    );
}


/**
 * The page that shows the details about an perm.
 */
export const PermDetailsPage: FC = () => (
    <PageGuard
        permissions={permissions}
        unauthorized={unauthorized}
    >
        <PermDetailsInner />
    </PageGuard>
);

import { FC, useEffect } from "react";
import { managementAppReadPermission } from "@secma/base";
import { NotAuthorized, PageHeader, TenantList } from "@secma/mui";
import { PageGuard, useAppDetails } from "@secma/react";
import { useLocation, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { DateTime } from "luxon";


const permissions = [managementAppReadPermission];
const unauthorized = <NotAuthorized permissions={permissions} />;


/**
 * The inner component of the application details page.
 */
export const AppDetailsInner: FC = () => {
    // Get the application unique identifier from the URL.
    const { slug } = useParams<{ slug: string }>();
    console.log("[AppDetailsPage] rendering %O", slug);


    // The link source may already have the application details.
    const { state } = useLocation();
    const hasState = state && typeof state === "object";
    console.log("[AppDetailsPage] location state %O", state);


    // Read details about this application only if we don't have them already.
    const {
        result,
        error: detailsError,
    } = useAppDetails(slug!, !hasState);
    const appDetails = hasState ? {
        ...state,
        created: DateTime.fromISO(state.created),
        updated: DateTime.fromISO(state.updated),
    } : result;
    console.log("[AppDetailsPage] result %O, error %O", result, detailsError);


    // Show the error to the user.
    useEffect(() => {
        if (detailsError) {
            enqueueSnackbar(detailsError.message, {
                variant: "error",
            });
        }
    }, [detailsError]);

    console.log("[AppDetailsPage] appDetails %O", appDetails);
    return (
        <>
            <PageHeader
                title={
                    (appDetails && appDetails.title)
                        ? appDetails.title
                        : slug!
                }
                description={
                    (appDetails && appDetails.description)
                        ? appDetails.description
                        : ""
                }
                created={appDetails ? appDetails.created : undefined}
                updated={appDetails ? appDetails.updated : undefined}
            />
            <TenantList appSlug={slug!} />
        </>
    );
}


/**
 * The page that shows the details about an application.
 */
export const AppDetailsPage: FC = () => (
    <PageGuard
        permissions={permissions}
        unauthorized={unauthorized}
    >
        <AppDetailsInner />
    </PageGuard>
);

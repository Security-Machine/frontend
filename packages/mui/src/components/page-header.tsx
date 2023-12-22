import { FC } from "react";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";
import { Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Box from "@mui/material/Box";
import { DateTime } from "luxon";


const sxTitle = {
    mt: 2,
    mb: 2,
    textAlign: "center",
};

const sxDescription = {
    mb: 2,
};

const sxDate = {
    fontSize: "0.8rem",
    color: "text.secondary",
    textAlign: "center",
};


/**
 * Properties for the {@link PageHeader} component.
 */
export interface PageHeaderProps {
    /**
     * The title for this page.
     */
    title: string;

    /**
     * The description for this page.
     */
    description?: string;

    /**
     * The date this resource was created.
     */
    created?: DateTime;

    /**
     * The date this resource was last updated.
     */
    updated?: DateTime;
}


/**
 * A page header that includes a title, a description and the created and
 * last updated dates.
 */
export const PageHeader: FC<PageHeaderProps> = ({
    title,
    description,
    created,
    updated
}) => (
    <Box>
        <Box>
            <Typography variant="h4" sx={sxTitle}>
                {title}
            </Typography>
        </Box>
        <Box>
            <Typography variant="body1" sx={sxDescription}>
                {description}
            </Typography>
        </Box>
        <Grid container spacing={2}>
            <Grid xs={6}>
                <Typography variant="body2" sx={sxDate}>
                    {created ? (
                        <>
                            <FormattedMessage
                                id="secma-mui.pageHeader.created"
                                defaultMessage="Created: "
                            />
                            <FormattedTime
                                value={created.toISO() as string}
                                hour="numeric"
                                minute="numeric"
                            />{", "}
                            <FormattedDate
                                value={created.toISO() as string}
                                year="numeric"
                                month="long"
                                day="numeric"
                            />
                        </>
                    ) : null}
                </Typography>
            </Grid>
            <Grid xs={6}>
                <Typography variant="body2" sx={sxDate}>
                    {updated ? (
                        <>
                            <FormattedMessage
                                id="secma-mui.pageHeader.updated"
                                defaultMessage="Last update: "
                            />
                            <FormattedTime
                                value={updated.toISO() as string}
                                hour="numeric"
                                minute="numeric"
                            />{", "}
                            <FormattedDate
                                value={updated.toISO() as string}
                                year="numeric"
                                month="long"
                                day="numeric"
                            />
                        </>
                    ) : null}
                </Typography>
            </Grid>
        </Grid>
    </Box>
);

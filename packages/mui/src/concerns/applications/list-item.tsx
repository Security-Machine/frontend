import { FC } from "react";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ApplicationData } from "@secma/base";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import { ListItemControls } from "../../components";


// We need to add a margin to the button because the default incarnation
// leaves room for a single icon and we have two buttons.
const sxButton = {
    mr: 8,
}


/**
 * The properties for the (@link AppListItem).
 */
export interface AppListItemProps {
    /**
     * The application represented by this list item.
     */
    app: string | ApplicationData;

    /**
     * The callback for when the edit button is clicked.
     *
     * If this is not provided, the edit button will be disabled.
     */
    onEdit?: (unique: string) => void;

    /**
     * The callback for when the delete button is clicked.
     *
     * If this is not provided, the edit button will be disabled.
     */
    onDelete?: (unique: string) => void;
}


/**
 * The list of applications.
 */
export const AppListItem: FC<AppListItemProps> = ({
    app,
    onEdit,
    onDelete,
}) => {
    const unique = typeof app === "string" ? app : app.slug;
    const urlData = typeof app === "string" ? app : {
        ...app,
        created: app.created ? app.created.toISO() : undefined,
        updated: app.updated ? app.updated.toISO() : undefined,
    };
    return (
        <ListItem
            secondaryAction={
                <ListItemControls
                    unique={unique}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            }
        >
            <ListItemButton
                role={undefined}
                sx={sxButton}
                component={Link}
                to={unique}
                state={urlData}
            >
                <ListItemIcon>
                    <AutoAwesomeIcon />
                </ListItemIcon>
                {typeof app === "string" ? (
                    <ListItemText
                        primary={app}
                    />
                ) : (
                    <ListItemText
                        primary={app.title || app.slug}
                        secondary={app.description}
                    />
                )}
            </ListItemButton>
        </ListItem>
    );
}

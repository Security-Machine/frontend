import { FC } from "react";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { RoleData } from "@secma/base";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Groups2Icon from '@mui/icons-material/Groups2';

import { ListItemControls } from "../../components";
import { useAdminUrl } from "@secma/react";


// We need to add a margin to the button because the default incarnation
// leaves room for a single icon and we have two buttons.
const sxButton = {
    mr: 8,
}


/**
 * The properties for the (@link RoleListItem).
 */
export interface RoleListItemProps {

    /**
     * The slug of the parent application.
     */
    appSlug: string;

    /**
     * The slug of the parent tenant.
     */
    tenSlug: string;

    /**
     * The role represented by this list item.
     */
    role: string | RoleData;

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
 * The list of roles in an application.
 */
export const RoleListItem: FC<RoleListItemProps> = ({
    appSlug,
    tenSlug,
    role,
    onEdit,
    onDelete,
}) => {
    const unique = typeof role === "string" ? role : role.name;
    const urlData = typeof role === "string" ? role : {
        ...role,
        created: role.created ? role.created.toISO() : undefined,
        updated: role.updated ? role.updated.toISO() : undefined,
    };
    const url = useAdminUrl("role", appSlug, tenSlug, unique);

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
                to={url}
                state={urlData}
            >
                <ListItemIcon>
                    <Groups2Icon />
                </ListItemIcon>
                {typeof role === "string" ? (
                    <ListItemText
                        primary={role}
                    />
                ) : (
                    <ListItemText
                        primary={role.name}
                        secondary={role.description}
                    />
                )}
            </ListItemButton>
        </ListItem>
    );
}

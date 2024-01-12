import { FC } from "react";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { UserData } from "@secma/base";
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
 * The properties for the (@link UserListItem).
 */
export interface UserListItemProps {

    /**
     * The slug of the parent application.
     */
    appSlug: string;

    /**
     * The slug of the parent tenant.
     */
    tenSlug: string;

    /**
     * The user represented by this list item.
     */
    user: string | UserData;

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
 * The list of users in an application.
 */
export const UserListItem: FC<UserListItemProps> = ({
    appSlug,
    tenSlug,
    user,
    onEdit,
    onDelete,
}) => {
    console.log("[UserListItem] user %O", user);
    const unique = typeof user === "string" ? user : user.name;
    const urlData = typeof user === "string" ? user : {
        ...user,
        created: user.created ? user.created.toISO() : undefined,
        updated: user.updated ? user.updated.toISO() : undefined,
    };
    const url = useAdminUrl("user", appSlug, tenSlug, unique);

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
                {typeof user === "string" ? (
                    <ListItemText
                        primary={user}
                    />
                ) : (
                    <ListItemText
                        primary={user.name}
                        secondary={user.description}
                    />
                )}
            </ListItemButton>
        </ListItem>
    );
}

import { FC } from "react";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { PermData } from "@secma/base";
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
 * The properties for the (@link PermListItem).
 */
export interface PermListItemProps {

    /**
     * The slug of the parent application.
     */
    appSlug: string;

    /**
     * The slug of the parent tenant.
     */
    tenSlug: string;

    /**
     * The perm represented by this list item.
     */
    perm: string | PermData;

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
 * The list of perms in an application.
 */
export const PermListItem: FC<PermListItemProps> = ({
    appSlug,
    tenSlug,
    perm,
    onEdit,
    onDelete,
}) => {
    const unique = typeof perm === "string" ? perm : perm.name;
    const urlData = typeof perm === "string" ? perm : {
        ...perm,
        created: perm.created ? perm.created.toISO() : undefined,
        updated: perm.updated ? perm.updated.toISO() : undefined,
    };
    const url = useAdminUrl("perm", appSlug, tenSlug, unique);

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
                {typeof perm === "string" ? (
                    <ListItemText
                        primary={perm}
                    />
                ) : (
                    <ListItemText
                        primary={perm.name}
                        secondary={perm.description}
                    />
                )}
            </ListItemButton>
        </ListItem>
    );
}

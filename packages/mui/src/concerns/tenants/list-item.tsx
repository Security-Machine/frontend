import { FC } from "react";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { TenantData } from "@secma/base";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Groups2Icon from '@mui/icons-material/Groups2';

import { ListItemControls } from "../../components";


// We need to add a margin to the button because the default incarnation
// leaves room for a single icon and we have two buttons.
const sxButton = {
    mr: 8,
}


/**
 * The properties for the (@link TenantListItem).
 */
export interface TenantListItemProps {
    /**
     * The tenant represented by this list item.
     */
    tenant: string | TenantData;

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
 * The list of tenants in an application.
 */
export const TenantListItem: FC<TenantListItemProps> = ({
    tenant,
    onEdit,
    onDelete,
}) => {
    const unique = typeof tenant === "string" ? tenant : tenant.slug;
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
                state={tenant}
            >
                <ListItemIcon>
                    <Groups2Icon />
                </ListItemIcon>
                {typeof tenant === "string" ? (
                    <ListItemText
                        primary={tenant}
                    />
                ) : (
                    <ListItemText
                        primary={tenant.title || tenant.slug}
                        secondary={tenant.description}
                    />
                )}
            </ListItemButton>
        </ListItem>
    );
}

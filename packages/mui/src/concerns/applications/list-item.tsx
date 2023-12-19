import { FC } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemControls } from "../../components";
import { ApplicationData } from "@secma/base";


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
    return (
        <ListItem secondaryAction={
            <ListItemControls
                unique={unique}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        }>
            {typeof app === "string" ? (
                <ListItemText
                    primary={app}
                />
            ) : (
                <ListItemText
                    primary={app.title}
                    secondary={app.description}
                />
            )}
        </ListItem>
    );
}

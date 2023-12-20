import React, { FC, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


/**
 * The properties expected by the ListControls component.
 */
export interface ListItemControlsProps {
    /**
     * The unique identifier od the list item.
     */
    unique: string;

    /**
     * The callback for when the edit button is clicked.
     */
    onEdit?: (unique: string) => void;

    /**
     * The callback for when the delete button is clicked.
     */
    onDelete?: (unique: string) => void;
}


/**
 * The edit and delete controls for each item in the list.
 *
 * You can disable one or both of the buttons by not passing the
 * corresponding callback.
 */
export const ListItemControls: FC<ListItemControlsProps> = ({
    unique,
    onEdit,
    onDelete
}) => {
    const handleEdit = useCallback(() => {
        if (onEdit) onEdit(unique);
    }, [unique, onEdit]);

    const handleDelete = useCallback(() => {
        if (onDelete) onDelete(unique);
    }, [unique, onDelete]);

    return (
        <>
            <IconButton
                size="large"
                onClick={handleEdit}
                color="primary"
                disabled={!onEdit}
            >
                <EditIcon />
            </IconButton>
            <IconButton
                size="large"
                onClick={handleDelete}
                color="error"
                disabled={!onDelete}
            >
                <DeleteIcon />
            </IconButton>
        </>
    )
}

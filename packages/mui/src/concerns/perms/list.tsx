import { FC } from "react";
import List from "@mui/material/List";
import {
    PermDelDialogInList,
    PermEditDialogInList, PermListController, usePermListContext
} from "@secma/react";

import { PermListItem } from "./list-item";
import { CreatePermButton } from "./create-btn";
import { PermEditDialog } from "./dialog";
import { PermConfirmDeleteDialog } from "./del-dialog";


const sxList = {
    minWidth: 360,
}


/**
 * The properties for the (@link PermInnerList).
 */
export interface PermListProps {
    appSlug: string;
    tenSlug: string;
}


/**
 * Only the actual list, without controls.
 */
export const PermInnerList: FC<PermListProps> = ({
    appSlug,
    tenSlug,
}) => {
    const {
        data,
        beginEdit,
        beginDelete,
        canUpdate,
        canDelete,
    } = usePermListContext();
    return (
        <List sx={sxList}>
            {Object.keys(data).map((key) => (
                <PermListItem
                    appSlug={appSlug}
                    tenSlug={tenSlug}
                    key={key}
                    perm={data[key]}
                    onEdit={canUpdate ? beginEdit : undefined}
                    onDelete={canDelete ? beginDelete : undefined}
                />
            ))}
        </List>
    );
}


/**
 * The list of perms in an application.
 */
export const PermList: FC<PermListProps> = ({
    appSlug,
    tenSlug,
}) => (
    <PermListController appSlug={appSlug} tenSlug={tenSlug}>
        <PermInnerList appSlug={appSlug} tenSlug={tenSlug}/>
        <CreatePermButton />
        <PermEditDialogInList appSlug={appSlug} tenSlug={tenSlug}>
            <PermEditDialog appSlug={appSlug} tenSlug={tenSlug}/>
        </PermEditDialogInList>
        <PermDelDialogInList appSlug={appSlug} tenSlug={tenSlug}>
            <PermConfirmDeleteDialog />
        </PermDelDialogInList>
    </PermListController>
);

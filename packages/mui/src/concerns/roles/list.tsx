import { FC } from "react";
import List from "@mui/material/List";
import {
    RoleDelDialogInList,
    RoleEditDialogInList, RoleListController, useRoleListContext
} from "@secma/react";

import { RoleListItem } from "./list-item";
import { CreateRoleButton } from "./create-btn";
import { RoleEditDialog } from "./dialog";
import { RoleConfirmDeleteDialog } from "./del-dialog";


const sxList = {
    minWidth: 360,
}


/**
 * The properties for the (@link RoleInnerList).
 */
export interface RoleListProps {
    appSlug: string;
    tenSlug: string;
}


/**
 * Only the actual list, without controls.
 */
export const RoleInnerList: FC<RoleListProps> = ({
    appSlug,
    tenSlug,
}) => {
    const {
        data,
        beginEdit,
        beginDelete,
        canUpdate,
        canDelete,
    } = useRoleListContext();
    return (
        <List sx={sxList}>
            {Object.keys(data).map((key) => (
                <RoleListItem
                    appSlug={appSlug}
                    tenSlug={tenSlug}
                    key={key}
                    role={data[key]}
                    onEdit={canUpdate ? beginEdit : undefined}
                    onDelete={canDelete ? beginDelete : undefined}
                />
            ))}
        </List>
    );
}


/**
 * The list of roles in an application.
 */
export const RoleList: FC<RoleListProps> = ({
    appSlug,
    tenSlug,
}) => (
    <RoleListController appSlug={appSlug} tenSlug={tenSlug}>
        <RoleInnerList appSlug={appSlug} tenSlug={tenSlug}/>
        <CreateRoleButton />
        <RoleEditDialogInList appSlug={appSlug} tenSlug={tenSlug}>
            <RoleEditDialog appSlug={appSlug} tenSlug={tenSlug}/>
        </RoleEditDialogInList>
        <RoleDelDialogInList appSlug={appSlug} tenSlug={tenSlug}>
            <RoleConfirmDeleteDialog />
        </RoleDelDialogInList>
    </RoleListController>
);

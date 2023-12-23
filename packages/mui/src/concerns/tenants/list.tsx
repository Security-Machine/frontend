import { FC } from "react";
import List from "@mui/material/List";
import {
    TenantDelDialogInList,
    TenantEditDialogInList, TenantListController, useTenantListContext
} from "@secma/react";

import { TenantListItem } from "./list-item";
import { CreateTenantButton } from "./create-btn";
import { TenantEditDialog } from "./dialog";
import { TenantConfirmDeleteDialog } from "./del-dialog";


const sxList = {
    minWidth: 360,
}


/**
 * The properties for the (@link TenantInnerList).
 */
export interface TenantListProps {
    appSlug: string;
}


/**
 * Only the actual list, without controls.
 */
export const TenantInnerList: FC<TenantListProps> = ({
    appSlug
}) => {
    const {
        data,
        beginEdit,
        beginDelete,
        canUpdate,
        canDelete,
    } = useTenantListContext();
    return (
        <List sx={sxList}>
            {Object.keys(data).map((key) => (
                <TenantListItem
                    appSlug={appSlug}
                    key={key}
                    tenant={data[key]}
                    onEdit={canUpdate ? beginEdit : undefined}
                    onDelete={canDelete ? beginDelete : undefined}
                />
            ))}
        </List>
    );
}


/**
 * The list of tenants in an application.
 */
export const TenantList: FC<TenantListProps> = ({
    appSlug
}) => (
    <TenantListController appSlug={appSlug}>
        <TenantInnerList appSlug={appSlug} />
        <CreateTenantButton />
        <TenantEditDialogInList appSlug={appSlug}>
            <TenantEditDialog appSlug={appSlug} />
        </TenantEditDialogInList>
        <TenantDelDialogInList appSlug={appSlug}>
            <TenantConfirmDeleteDialog />
        </TenantDelDialogInList>
    </TenantListController>
);

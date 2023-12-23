import { FC } from "react";
import List from "@mui/material/List";
import {
    UserDelDialogInList,
    UserEditDialogInList, UserListController, useUserListContext
} from "@secma/react";

import { UserListItem } from "./list-item";
import { CreateUserButton } from "./create-btn";
import { UserEditDialog } from "./dialog";
import { UserConfirmDeleteDialog } from "./del-dialog";


const sxList = {
    minWidth: 360,
}


/**
 * The properties for the (@link UserInnerList).
 */
export interface UserListProps {
    appSlug: string;
    tenSlug: string;
}


/**
 * Only the actual list, without controls.
 */
export const UserInnerList: FC<UserListProps> = ({
    appSlug,
    tenSlug,
}) => {
    const {
        data,
        beginEdit,
        beginDelete,
        canUpdate,
        canDelete,
    } = useUserListContext();
    return (
        <List sx={sxList}>
            {Object.keys(data).map((key) => (
                <UserListItem
                    appSlug={appSlug}
                    tenSlug={tenSlug}
                    key={key}
                    user={data[key]}
                    onEdit={canUpdate ? beginEdit : undefined}
                    onDelete={canDelete ? beginDelete : undefined}
                />
            ))}
        </List>
    );
}


/**
 * The list of users in an application.
 */
export const UserList: FC<UserListProps> = ({
    appSlug,
    tenSlug,
}) => (
    <UserListController appSlug={appSlug} tenSlug={tenSlug}>
        <UserInnerList appSlug={appSlug} tenSlug={tenSlug}/>
        <CreateUserButton />
        <UserEditDialogInList appSlug={appSlug} tenSlug={tenSlug}>
            <UserEditDialog appSlug={appSlug} tenSlug={tenSlug}/>
        </UserEditDialogInList>
        <UserDelDialogInList appSlug={appSlug} tenSlug={tenSlug}>
            <UserConfirmDeleteDialog />
        </UserDelDialogInList>
    </UserListController>
);

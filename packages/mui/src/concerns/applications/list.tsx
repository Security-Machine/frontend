import { FC } from "react";
import List from "@mui/material/List";
import { AppListController, useAppListContext } from "@secma/react";
import { AppListItem } from "./list-item";
import { CreateAppButton } from "./create-btn";


const listStyle = {
    minWidth: 360,
}


/**
 * The properties for the (@link AppList).
 */
export interface AppListProps {

}


/**
 * Only the actual list, without controls.
 */
export const AppInnerList = () => {
    const {
        data,
        beginEdit,
        beginDelete,
        canUpdate,
        canDelete,
    } = useAppListContext();
    return (
        <List sx={listStyle}>
            {Object.keys(data).map((key) => (
                <AppListItem
                    key={key}
                    app={data[key]}
                    onEdit={canUpdate ? beginEdit : undefined}
                    onDelete={canDelete ? beginDelete : undefined}
                />
            ))}
        </List>
    );
}


/**
 * The list of applications.
 */
export const AppList: FC<AppListProps> = () => {
    return (
        <AppListController>
            <AppInnerList />
            <CreateAppButton />
        </AppListController>
    )
}

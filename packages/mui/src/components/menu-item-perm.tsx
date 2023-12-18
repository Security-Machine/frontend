import { FC } from "react";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import { useSecMaAuthorized } from "@secma/react";
import { Link } from "react-router-dom";


/**
 * The properties expected by the {@link MenuItemPerm} component.
 */
export interface MenuItemPermProps extends Omit<MenuItemProps, "component"> {
    /**
    * The permissions required to access this page.
    */
    permissions: string[];

    /**
     * Where to navigate to.
     */
    to: string;
}


/**
 * A menu item that is only visible if the user has the required permissions.
 */
export const MenuItemPerm: FC<MenuItemPermProps> = ({
    permissions,
    to,
    children,
    ...rest
}) => {
    if (useSecMaAuthorized(permissions)) {
        return (
            <MenuItem
                component={Link}
                to={to}
                {...rest as any}
            >
                {children}
            </MenuItem>
        );
    } else {
        console.log(`MenuItemPerm: ${permissions} not authorized`);
        return null;
    }
}

import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { PopoverOrigin } from "@mui/material/Popover";
import { managementAppListPermission } from "@secma/base";
import { MenuItemPerm } from "@secma/mui";
import { useSecMaContext } from "@secma/react";
import { FC, useCallback } from "react";
import { FormattedMessage } from "react-intl";


const anchorOrigin: PopoverOrigin = {
    vertical: 'bottom',
    horizontal: 'right',
}


const transformOrigin: PopoverOrigin = {
    vertical: 'top',
    horizontal: 'right',
}


const appPermissions = [managementAppListPermission];


/**
 * The properties expected by the {@link UserMenu} component.
 */
export interface UserMenuProps {
    /**
     * The ID that should be used with the menu component.
     */
    menuId: string;

    /**
     * The element that should be used as the anchor for the menu.
     */
    anchorEl: HTMLElement | null;

    /**
     * The function that should be used to close the menu.
     */
    handleClose: () => void;
}


/**
 * A menu that displays the menu for the current user.
 */
export const UserMenu: FC<UserMenuProps> = ({
    menuId,
    anchorEl,
    handleClose
}) => {

    const { signOut } = useSecMaContext();

    const handleSignOut = useCallback(() => {
        if (signOut) signOut();
        handleClose();
    }, [signOut]);

    return (
        <Menu
            anchorOrigin={anchorOrigin}
            keepMounted
            transformOrigin={transformOrigin}
            open={Boolean(anchorEl)}
            id={menuId}
            onClose={handleClose}
            anchorEl={anchorEl}
        >
            <MenuItemPerm
                onClick={handleClose}
                to="apps"
                permissions={appPermissions}
            >
                <FormattedMessage
                    id="secma-admin.apps.menu"
                    defaultMessage="Applications"
                />
            </MenuItemPerm>
            <Divider />
            <MenuItem onClick={handleSignOut}>
                <FormattedMessage
                    id="secma-admin.sign-out"
                    defaultMessage="Sign Out"
                />
            </MenuItem>
        </Menu>
    )
}

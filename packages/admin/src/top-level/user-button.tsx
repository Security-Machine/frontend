import { FC } from "react";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { useButtonMenu, useSecMaContext } from "@secma/react";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { UserMenu } from "./user-menu";
import { PublicMenu } from "./public-menu";


/**
 * The properties expected by the {@link UserButton} component.
 */
export interface UserButtonProps extends IconButtonProps {

}


/**
 * A button that displays the menu for the current user.
 */
export const UserButton: FC<UserButtonProps> = () => {
    // Access the current user.
    const {
        user_name
    } = useSecMaContext();

    // Common button-menu mechanics.
    const {
        menuId,
        anchorEl,
        handleMenu,
        handleClose,
    } = useButtonMenu();

    const MenuComponent = user_name ? UserMenu : PublicMenu;
    const key = user_name ? "user" : "public";

    return (
        <>
            <IconButton
                size="large"
                aria-label="Click to show the menu"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                {user_name ? <AccountCircle /> : <MenuIcon />}
            </IconButton>
            <MenuComponent
                key={key}
                menuId={menuId}
                anchorEl={anchorEl}
                handleClose={handleClose}
            />
        </>
    );
}

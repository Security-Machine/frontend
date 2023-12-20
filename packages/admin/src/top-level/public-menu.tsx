import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { PopoverOrigin } from "@mui/material/Popover";
import { useSecMaContext } from "@secma/react";
import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";


const anchorOrigin: PopoverOrigin = {
    vertical: 'bottom',
    horizontal: 'right',
}


const transformOrigin: PopoverOrigin = {
    vertical: 'top',
    horizontal: 'right',
}


/**
 * The properties expected by the {@link PublicMenu} component.
 */
export interface PublicMenuProps {
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
export const PublicMenu: FC<PublicMenuProps> = ({
    menuId,
    anchorEl,
    handleClose
}) => {
    // Access the current user.
    const {
        user_name
    } = useSecMaContext();
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
            <MenuItem
                component={Link}
                onClick={handleClose}
                to="email-password/sign-in"
            >
                <FormattedMessage
                    id="secma-admin.login.password"
                    defaultMessage="Log-in using email and password"
                />
            </MenuItem>
            <MenuItem
                component={Link}
                onClick={handleClose}
                to="passwordless/sign-in"
            >
                <FormattedMessage
                    id="secma-admin.login.passwordless"
                    defaultMessage="Password-less login"
                />
            </MenuItem>
            <MenuItem
                component={Link}
                onClick={handleClose}
                to="third-party/sign-in"
            >
                <FormattedMessage
                    id="secma-admin.login.3rd-party"
                    defaultMessage="Third-party login"
                />
            </MenuItem>
        </Menu>
    )
}

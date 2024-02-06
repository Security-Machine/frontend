import { Container, Typography } from "@mui/material";
import { useSecMaContext } from "@secma/react";
import { Link, Outlet, } from "react-router-dom";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import PasswordIcon from '@mui/icons-material/Password';
import HouseIcon from '@mui/icons-material/House';

const sxOuterBox = {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "start",
    alignContent: "center"
}


const sxNavigationList = {
    maxWidth: 360,
    width: 360,
    paddingRight: 2,
}


const sxContent = {

}

export const NavItem = ({
    to,
    title,
    description = undefined,
    children
}: {
    to: string,
    title: string,
    description?: string,
    children: React.ReactNode
}) => (
    <ListItem disablePadding>
        <ListItemButton
            component={Link}
            to={to}
        >
            <ListItemIcon>
                {children}
            </ListItemIcon>
            <ListItemText
                primary={title}
                secondary={description}
            />
        </ListItemButton>
    </ListItem>
)



export const AppLayout = () => {
    const user = useSecMaContext();
    return (
        <Container>
            <Typography variant="body1" padding={2}>
                This is a sample application that makes use of
                the SecMa framework.
            </Typography>
            <Box sx={sxOuterBox}>
                <Box
                    sx={sxNavigationList}
                    component="nav"
                    aria-label="Available routes"
                >
                    <List dense>
                    <NavItem
                            to="/"
                            title="Home"
                        >
                            <HouseIcon />
                        </NavItem>
                        <NavItem
                            to="/email-password/sign-in"
                            title="Sign In"
                            description="using user-name and password"
                        >
                            <PasswordIcon />
                        </NavItem>
                        <NavItem
                            to="/email-password/sign-up"
                            title="Sign Up"
                            description="using user-name and password"
                        >
                            <PasswordIcon />
                        </NavItem>

                    </List>
                </Box>
                <Box sx={sxContent}>
                    <Outlet />
                </Box>
            </Box>
        </Container>
    );
}

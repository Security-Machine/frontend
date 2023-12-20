import { FC, ReactNode } from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { UserButton } from './user-button';


/**
 * Properties expected by the {@link AppBar} wrapper component.
 */
export type AppBarProps = Omit<MuiAppBarProps, "position" | "elevation">;


/**
 * Wrapper component for the {@link MuiAppBar} component to fix it to the top.
 */
export const AppBar: FC<AppBarProps> = (props) => {
    return (
        <MuiAppBar
            elevation={0}
            position="fixed"
            {...props}
        />
    );
}


// The style for the application label.
const sxLabel = { flexGrow: 1 };


/**
 * Default logo component for the application.
 */
export const DefaultLogo: FC = () => (
    <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={sxLabel}
    >
        <FormattedMessage
            id="secma-admin.app.title"
            defaultMessage="Security machine"
        />
    </Typography>
)


/**
 * Properties expected by the {@link AppLayout} component.
 */
export interface AppLayoutProps {
    /**
     * The logo to display in the application bar.
     */
    logo?: ReactNode;
}


/**
 * Top level UI component for the application.
 *
 * It is used with react-router-dom so it includes an
 * {@link Outlet} component where pages will be rendered.
 */
export const AppLayout: FC<AppLayoutProps> = ({
    logo = <DefaultLogo />
}) => {
    return (
        <>
            <AppBar>
                <Toolbar>
                    {logo}
                    <UserButton />
                </Toolbar>
            </AppBar>
            <Box
                component="main"
            >
                <Toolbar />
                <Outlet />
            </Box>
        </>
    );
}

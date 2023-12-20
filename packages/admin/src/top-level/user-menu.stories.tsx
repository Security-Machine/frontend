import { useState } from 'react';
import type { StoryFn, Meta } from '@storybook/react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { SecMaContextProvider } from '@secma/react';

import type { UserMenuProps } from './user-menu';
import { UserMenu } from './user-menu';
import { enqueueSnackbar } from 'notistack';
import Button from '@mui/material/Button';


// The properties passed to each story.
type StoryProps = Omit<UserMenuProps, "anchorEl" | "handleClose">;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'top-level/UserMenu',
    tags: [],
    component: UserMenu as any,
    args: {
        menuId: "menu",
    },
};
export default storybookConfig;

// Base for all stories in this file.
const Template: StoryFn<StoryProps> = (args) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [permissions, setPermissions] = useState<string[]>(["apps:r"]);
    const setPermOnClick = (perm: string, checked: boolean) => {
        if (checked) {
            setPermissions([...permissions, perm]);
        } else {
            setPermissions(permissions.filter((p) => p !== perm));
        }
    }
    const handleClose = () => {
        enqueueSnackbar('handleClose');
        setAnchorEl(document.body);
    };
    return (
        <SecMaContextProvider value={{
            signIn: (() => { }) as any,
            signOut: () => { },
            user_name: "user",
            expires: 0,
            permissions,
            token: "token"
        }}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={permissions.includes("apps:r")}
                            onChange={(e) => {
                                setPermOnClick("apps:r", e.target.checked);
                            }}
                        />
                    }
                    label="apps:r"
                />
            </FormGroup>
            <Button onClick={() => { setAnchorEl(document.body); }}>
                Open
            </Button>
            <UserMenu
                anchorEl={anchorEl}
                handleClose={handleClose}
                {...args}
            />
        </SecMaContextProvider>
    );
}


export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

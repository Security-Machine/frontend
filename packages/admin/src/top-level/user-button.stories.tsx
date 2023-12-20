import type { StoryFn, Meta } from '@storybook/react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { SecMaContextProvider } from '@secma/react';

import type { UserButtonProps } from './user-button';
import { UserButton } from './user-button';
import { useState } from 'react';


// The properties passed to each story.
type StoryProps = UserButtonProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'top-level/UserButton',
    tags: [],
    component: UserButton,
    args: {

    },
};
export default storybookConfig;


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = (args) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(true);
    const [permissions, setPermissions] = useState<string[]>(["apps:r"]);
    const setPermOnClick = (perm: string, checked: boolean) => {
        if (checked) {
            setPermissions([...permissions, perm]);
        } else {
            setPermissions(permissions.filter((p) => p !== perm));
        }
    }
    return (
        <SecMaContextProvider value={{
            signIn: (() => { }) as any,
            signOut: () => { },
            user_name: loggedIn ? "user" : undefined,
            expires: 0,
            permissions,
            token: "token"
        }}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={loggedIn}
                            onChange={(e) => {
                                setLoggedIn(e.target.checked);
                            }}
                        />
                    }
                    label="Logged-In"
                />
                <hr />
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
            <UserButton {...args} />
        </SecMaContextProvider>
    );
}

export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

import { useState } from 'react';
import type { StoryFn, Meta } from '@storybook/react';
import { enqueueSnackbar } from 'notistack';
import { SecMaContextProvider } from '@secma/react';

import type { PublicMenuProps } from './public-menu';
import { PublicMenu } from './public-menu';


// The properties passed to each story.
type StoryProps = Omit<PublicMenuProps, "anchorEl" | "handleClose">;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'top-level/PublicMenu',
    tags: [],
    component: PublicMenu as any,
    args: {
        menuId: "menu",
    },
};
export default storybookConfig;


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = (args) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    return (
        <SecMaContextProvider value={{
            signIn: (() => { }) as any,
            signOut: () => { },
            user_name: undefined,
            expires: 0,
            permissions: ["admin", "user"],
            token: "token"
        }}>
            <div ref={setAnchorEl} style={{
                width: 100,
                height: 100,
                backgroundColor: "red"
            }}>RefEl</div>
            <PublicMenu
                anchorEl={anchorEl}
                handleClose={() => { enqueueSnackbar('handleClose'); }}
                {...args}
            />
        </SecMaContextProvider>
    );
}

export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

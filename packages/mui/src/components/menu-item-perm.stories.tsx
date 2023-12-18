import type { StoryFn, Meta } from '@storybook/react';

import { MenuItemPerm, MenuItemPermProps } from "./menu-item-perm";
import { List } from '@mui/material';


// The properties passed to each story.
type StoryProps = MenuItemPermProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'components/MenuItemPerm',
    tags: [],
    component: MenuItemPerm,
    args: {
        to: "/lorem",
    },
};
export default storybookConfig;


// Base for all stories in this file.
export const Default: StoryFn<StoryProps> = (args) => (
    <List>
        <MenuItemPerm {...args} permissions={["ipsum"]}>
            List Item Visible
        </MenuItemPerm>
        <MenuItemPerm {...args} permissions={["xxx"]}>
            List Item Invisible
        </MenuItemPerm>
        <MenuItemPerm {...args} permissions={[]}>
            No permission needed
        </MenuItemPerm>
    </List>
);

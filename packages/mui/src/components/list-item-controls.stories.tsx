import type { StoryFn, Meta } from '@storybook/react';
import { enqueueSnackbar } from 'notistack';

import { ListItemControls, ListItemControlsProps } from "./list-item-controls";
import { List, ListItem } from '@mui/material';


// The properties passed to each story.
type StoryProps = ListItemControlsProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'components/ListItemControls',
    tags: [],
    component: ListItemControls,
    args: {
        unique: "lorem",
        onEdit: (unique: string) => { enqueueSnackbar(`Edit ${unique}`); },
        onDelete: (unique: string) => { enqueueSnackbar(`Delete ${unique}`); },
    },
};
export default storybookConfig;


// Base for all stories in this file.
export const Default: StoryFn<StoryProps> = (args) => (
    <List>
        <ListItem secondaryAction={
            <ListItemControls {...args} />
        }>
            List Item Content
        </ListItem>
    </List>
);

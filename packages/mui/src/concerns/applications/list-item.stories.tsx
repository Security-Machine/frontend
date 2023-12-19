import type { StoryFn, Meta } from '@storybook/react';
import { enqueueSnackbar } from 'notistack';
import { DateTime } from "luxon";

import type { AppListItemProps } from './list-item';
import { AppListItem } from './list-item';


// The properties passed to each story.
type StoryProps = AppListItemProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'concerns/applications/List Item',
    tags: [],
    component: AppListItem,
    args: {
        app: {
            slug: "lorem",
            title: "Lorem",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
            created: DateTime.fromISO('2016-05-25T09:08:34.123'),
            updated: DateTime.fromISO('201-05-25T09:08:34.123'),
        },
        onDelete: () => { enqueueSnackbar("onDelete"); },
        onEdit: () => { enqueueSnackbar("onEdit"); },
    },
};
export default storybookConfig;


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = (args) => (
    <AppListItem
        {...args}
    />
);

/**
 * The item allows editing and deleting.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};


/**
 * The item allows editing, but not deleting.
 */
export const NoDelete: StoryFn<StoryProps> = Template.bind({});
NoDelete.args = {
    onDelete: undefined,
};


/**
 * The item allows deleting, but not editing.
 */
export const NoEdit: StoryFn<StoryProps> = Template.bind({});
NoEdit.args = {
    onEdit: undefined,
};


/**
 * We only have the slug, not the full application data.
 */
export const SlugOnly: StoryFn<StoryProps> = Template.bind({});
SlugOnly.args = {
    app: "lorem",
};

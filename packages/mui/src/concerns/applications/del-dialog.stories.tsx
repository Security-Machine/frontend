import type { StoryFn, Meta } from '@storybook/react';
import type { AppConfirmDeleteDialogProps } from "./del-dialog";
import { AppConfirmDeleteDialog } from "./del-dialog";


// The properties passed to each story.
type StoryProps = AppConfirmDeleteDialogProps;

// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'concerns/applications/Delete Dialog',
    tags: [],
    component: AppConfirmDeleteDialog,
    args: {

    },
};
export default storybookConfig;


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = (args) => (
    <AppConfirmDeleteDialog {...args} />
);


export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

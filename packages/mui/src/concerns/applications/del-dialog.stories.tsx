import type { StoryFn, Meta } from '@storybook/react';
import type { AmmConfirmDeleteDialogProps } from "./del-dialog";
import { AmmConfirmDeleteDialog } from "./del-dialog";


// The properties passed to each story.
type StoryProps = AmmConfirmDeleteDialogProps;

// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'concerns/applications/Delete Dialog',
    tags: [],
    component: AmmConfirmDeleteDialog,
    args: {

    },
};
export default storybookConfig;


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = (args) => (
    <AmmConfirmDeleteDialog {...args} />
);


export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

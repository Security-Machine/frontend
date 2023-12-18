import type { StoryFn, Meta } from '@storybook/react';
import { LostPasswordMuiForm } from './lost-pass';


// The properties passed to each story.
type StoryProps = {};

// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'email-password/LostPasswordMuiForm',
    tags: [],
    component: LostPasswordMuiForm,
    args: {},
};
export default storybookConfig;

// Base for all stories in this file.
export const Default: StoryFn<StoryProps> = (args) => (
    <LostPasswordMuiForm {...args} />
);

import type { StoryFn, Meta } from '@storybook/react';
import { LostPasswordMuiForm } from './lost-pass';



// Common configuration for all stories.
const storybookConfig: Meta = {
    title: 'email-password/LostPasswordMuiForm',
    tags: [],
    component: LostPasswordMuiForm,
    args: {},
};
export default storybookConfig;

// Base for all stories in this file.
export const Default: StoryFn = (args) => (
    <LostPasswordMuiForm {...args} />
);

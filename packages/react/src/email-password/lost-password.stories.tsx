import type { StoryFn, Meta } from '@storybook/react';

import { LostPasswordForm, LostPasswordFormProps } from './lost-password';


// The properties passed to each story.
type StoryProps = LostPasswordFormProps;

// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'email-pass/LostPassword',
    tags: [],
    args: {},
    parameters: {
        fetchMock: {
            mocks: [

            ]
        }
    }
};
export default storybookConfig;

// Base for all stories in this file.
const Template: StoryFn<StoryProps> = (args) => {
    return (
        <LostPasswordForm {...args} />
    );
}

/**
 * The default story.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

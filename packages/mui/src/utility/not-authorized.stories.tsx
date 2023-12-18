import type { StoryFn, Meta } from '@storybook/react';
import { NotAuthorized } from './not-authorized';


// The properties passed to each story.
type StoryProps = {
    permissions: string[];
};

// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'utility/NotAuthorized',
    tags: [],
    component: NotAuthorized,
    args: {
        permissions: []
    },
};
export default storybookConfig;

// Base for all stories in this file.
export const Default: StoryFn<StoryProps> = (args) => (
    <NotAuthorized {...args} />
);

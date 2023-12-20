import type { StoryFn, Meta } from '@storybook/react';

import { AppEditor } from './editor';


// The properties passed to each story.
type StoryProps = {};


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'top-level/Error 404',
    tags: ['controller'],
    component: AppEditor,
    args: {},
};
export default storybookConfig;


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = () => (
    <AppEditor />
);


/**
 * The default story.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

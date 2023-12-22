import type { StoryFn, Meta } from '@storybook/react';

import { AppEditor } from './editor';


// Common configuration for all stories.
const storybookConfig: Meta = {
    title: 'concerns/applications/Edit Dialog',
    tags: ['controller'],
    component: AppEditor,
    args: {},
};
export default storybookConfig;


// Base for all stories in this file.
const Template: StoryFn = () => (
    <AppEditor />
);


/**
 * The default story.
 */
export const Default: StoryFn = Template.bind({});
Default.args = {};

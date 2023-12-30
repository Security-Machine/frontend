import type { StoryFn, Meta } from '@storybook/react';
import {
    AppDelDialogInList, AppDelDialogInListProps
} from "./del-in-list";



// The properties passed to each story.
type StoryProps = AppDelDialogInListProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'concerns/apps/del-in-list',
    tags: [],
    component: AppDelDialogInList,
};
export default storybookConfig;

const Inner = () => {
    return (
        <div>
            <p>Submit</p>
        </div>
    )
}



// Base for all stories in this file.
const Template: StoryFn<StoryProps> = () => {
    return (
        <AppDelDialogInList>
            <Inner />
        </AppDelDialogInList>
    );
};


/**
 * The default story.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

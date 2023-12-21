import type { StoryFn, Meta } from '@storybook/react';
import {
    AppEditDialogInList, AppEditDialogInListProps
} from "./dialog-in-list";



// The properties passed to each story.
type StoryProps = AppEditDialogInListProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'concerns/apps/dialog-in-list',
    tags: [],
    component: AppEditDialogInList,
    args: {

    },
    parameters: {
        fetchMock: {
            mocks: [

            ]
        }
    }
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
const Template: StoryFn<StoryProps> = ({

}) => {
    return (
        <AppEditDialogInList>
            <Inner />
        </AppEditDialogInList>
    );
};


/**
 * The default story.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

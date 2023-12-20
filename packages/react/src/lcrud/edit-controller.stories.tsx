import type { StoryFn, Meta } from '@storybook/react';


import { EditControllerProps, EditController, } from './edit-controller';
import { Field } from 'react-final-form';


interface FormData {
    id: number;
    title: string;
}


// The properties passed to each story.
type StoryProps = EditControllerProps<FormData>;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'CRUD/EditController',
    tags: [],
    component: EditController,
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


// The inner component that displays the context data.
const Viewer = () => {
    return (
        <div>
            <Field name="id" component="input" />
            <Field name="title" component="input" />
            <button type="submit">Submit</button>
        </div>
    )
}


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = ({

}) => {
    return (
        <EditController>
            <Viewer />
        </EditController>
    );
};


/**
 * The default story.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

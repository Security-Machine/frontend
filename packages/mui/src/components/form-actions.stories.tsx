import type { StoryFn, Meta } from '@storybook/react';
import { ContainerForm } from "@vebgen/mui-rff-debug";
import { enqueueSnackbar } from 'notistack';
import { Field } from 'react-final-form';

import type { StandardFormActionsProps } from './form-actions';
import { StandardFormActions } from './form-actions';


// The properties passed to each story.
type StoryProps = StandardFormActionsProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'components/SubmitButton',
    tags: [],
    component: StandardFormActions,
    args: {},
};
export default storybookConfig;

const Content = () => (
    <>
        <div>
            <Field name="id" component="input" />
        </div>
        <div>
            <Field name="name" component="input" />
        </div>
        <StandardFormActions />
    </>
)


// Base for create variant.
const Template: StoryFn<StoryProps> = (args) => (
    <ContainerForm
        onSubmit={() => { enqueueSnackbar("onSubmit"); }}
    >
        <Content />
    </ContainerForm>
);


export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

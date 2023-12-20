import type { StoryFn, Meta } from '@storybook/react';
import { ContainerForm } from "@vebgen/mui-rff-debug";

import { ResetButton } from "./reset-btn";
import { enqueueSnackbar } from 'notistack';
import { Field } from 'react-final-form';


// The properties passed to each story.
type StoryProps = {};


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'components/ResetButton',
    tags: [],
    component: ResetButton,
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
        <ResetButton />
    </>
)


// Base for create variant.
const Template: StoryFn<StoryProps> = (args) => (
    <ContainerForm
        onSubmit={() => { enqueueSnackbar("onSubmit"); }}
        initialValues={{ id: 1, name: "Initial Value" }}
    >
        <Content />
    </ContainerForm>
);


export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

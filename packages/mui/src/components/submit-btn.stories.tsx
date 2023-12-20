import type { StoryFn, Meta } from '@storybook/react';
import { ContainerForm } from "@vebgen/mui-rff-debug";

import { SubmitButton } from "./submit-btn";
import { enqueueSnackbar } from 'notistack';
import { Field } from 'react-final-form';


// The properties passed to each story.
type StoryProps = {};


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'components/SubmitButton',
    tags: [],
    component: SubmitButton,
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
        <SubmitButton />
    </>
)


// Base for create variant.
const TemplateCreate: StoryFn<StoryProps> = (args) => (
    <ContainerForm
        onSubmit={() => { enqueueSnackbar("onSubmit"); }}
    >
        <Content />
    </ContainerForm>
);


export const Create: StoryFn<StoryProps> = TemplateCreate.bind({});
Create.args = {};


// Base for edit variant.
const TemplateEdit: StoryFn<StoryProps> = (args) => (
    <ContainerForm
        initialValues={{ id: 1, name: "John Doe" }}
        onSubmit={() => { enqueueSnackbar("onSubmit"); }}
    >
        <Content />
    </ContainerForm>
);


export const Edit: StoryFn<StoryProps> = TemplateEdit.bind({});
Edit.args = {};

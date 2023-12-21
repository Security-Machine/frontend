import type { StoryFn, Meta } from '@storybook/react';
import { ContainerForm } from "@vebgen/mui-rff-debug";

import { SubmitButton } from "./submit-btn";
import { enqueueSnackbar } from 'notistack';
import { Field } from 'react-final-form';


// Common configuration for all stories.
const storybookConfig: Meta = {
    title: 'components/SubmitButton',
    tags: [],
    component: SubmitButton,
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
const TemplateCreate: StoryFn = () => (
    <ContainerForm
        onSubmit={() => { enqueueSnackbar("onSubmit"); }}
    >
        <Content />
    </ContainerForm>
);


export const Create: StoryFn = TemplateCreate.bind({});


// Base for edit variant.
const TemplateEdit: StoryFn = (args) => (
    <ContainerForm
        initialValues={{ id: 1, name: "John Doe" }}
        onSubmit={() => { enqueueSnackbar("onSubmit"); }}
    >
        <Content />
    </ContainerForm>
);


export const Edit: StoryFn = TemplateEdit.bind({});

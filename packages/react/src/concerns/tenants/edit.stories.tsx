import type { StoryFn, Meta } from '@storybook/react';
import { enqueueSnackbar } from 'notistack';
import { FormDebugger } from '@vebgen/mui-rff-debug';
import { Field, useFormState } from 'react-final-form';
import { TenantData } from '@secma/base';

import {
    TenantEditControllerProps, TenantEditController
} from "./edit";
import { SecMaContextProvider } from '../../user-controller';



// The properties passed to each story.
type StoryProps = TenantEditControllerProps & {
    user_name: string;
};


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'concerns/tenants/edit',
    tags: [],
    component: TenantEditController,
    args: {
        appSlug: 'app',
        user_name: 'user',
    },
    parameters: {
        fetchMock: {
            mocks: [
                {// create
                    matcher: {
                        url: "path:/tenants/app/",
                        method: 'PUT',
                    },
                    response: {
                        slug: "lorem",
                        description: "Lorem ipsum dolor sit amet.",
                        created: "2021-01-01T00:00:00.000Z",
                        updated: "2022-01-01T00:00:00.000Z",
                    },
                    options: {
                        delay: 1000,
                    }
                },
                {// edit
                    matcher: {
                        url: "path:/tenants/app/lorem",
                        method: 'POST',
                    },
                    response: {
                        slug: "lorem",
                        description: "Lorem ipsum dolor sit amet.",
                        created: "2021-01-01T00:00:00.000Z",
                        updated: "2022-01-01T00:00:00.000Z",
                    },
                    options: {
                        delay: 1000,
                    }
                },
            ]
        }
    }
};
export default storybookConfig;


// Form content.
const Viewer = () => {
    const {
        errors,
        submitErrors
    } = useFormState();
    return (
        <div>
            <Field name="slug">
                {({ input, meta }) => (
                    <div>
                        <label>Slug</label>
                        <input type="text" {...input} placeholder="slug" />
                        {
                            meta.touched &&
                            meta.error &&
                            <span>{meta.error}</span>
                        }
                    </div>
                )}
            </Field>
            <Field name="description">
                {({ input, meta }) => (
                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            {...input}
                            placeholder="Description"
                        />
                        {
                            meta.touched &&
                            meta.error &&
                            <span>{meta.error}</span>
                        }
                    </div>
                )}
            </Field>
            <button type="submit">Submit</button>
            <h5>Errors</h5>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
            <h5>Submission Errors</h5>
            <pre>{JSON.stringify(submitErrors, null, 2)}</pre>
        </div>
    )
}


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = ({
    user_name,
    ...args
}) => {

    const onSuccess = (result: TenantData) => {
        enqueueSnackbar("[EditController] onSuccess");
    }

    return (
        <SecMaContextProvider value={{
            signIn: (() => { }) as any,
            signOut: () => { },
            user_name,
            expires: 0,
            permissions: ["tenant:c", "tenant:u"],
            token: "token"
        }}>
            <TenantEditController
                onSuccess={onSuccess}
                {...args}
            >
                <Viewer />
                <FormDebugger />
            </TenantEditController>
        </SecMaContextProvider>
    );
};


/**
 * The default story creates a new item.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};


/**
 * No user logged in.
 */
export const NoUser: StoryFn<StoryProps> = Template.bind({});
NoUser.args = {
    user_name: undefined,
};


/**
 * Edit an exiting item.
 */
export const Edit: StoryFn<StoryProps> = Template.bind({});
Edit.args = {
    initialValues: {
        slug: "lorem",
        description: "Lorem ipsum dolor sit amet.",
    },
};

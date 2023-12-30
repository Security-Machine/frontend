import type { StoryFn, Meta } from '@storybook/react';
import { enqueueSnackbar } from 'notistack';
import { FormDebugger } from '@vebgen/mui-rff-debug';
import { Field, useFormState } from 'react-final-form';
import { PermData } from '@secma/base';

import {
    PermEditControllerProps, PermEditController
} from "./edit";
import { SecMaContextProvider } from '../../user-controller';



// The properties passed to each story.
type StoryProps = PermEditControllerProps & {
    user_name: string;
};


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'concerns/perms/edit',
    tags: [],
    component: PermEditController,
    args: {
        appSlug: 'app',
        tenSlug: 'ten',
        user_name: 'user',
    },
    parameters: {
        fetchMock: {
            mocks: [
                {// create
                    matcher: {
                        url: "path:/perm/app/ten/",
                        method: 'PUT',
                    },
                    response: {
                        name: "lorem",
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
                        url: "path:/perm/app/ten/lorem",
                        method: 'POST',
                    },
                    response: {
                        name: "lorem",
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
            <Field name="name">
                {({ input, meta }) => (
                    <div>
                        <label>Name</label>
                        <input type="text" {...input} placeholder="Name" />
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

    const onSuccess = (result: PermData) => {
        enqueueSnackbar("[EditController] onSuccess");
    }

    return (
        <SecMaContextProvider value={{
            signIn: (() => { }) as any,
            signOut: () => { },
            user_name,
            expires: 0,
            permissions: ["perm:c", "perm:u"],
            token: "token"
        }}>
            <PermEditController
                onSuccess={onSuccess}
                {...args}
            >
                <Viewer />
                <FormDebugger />
            </PermEditController>
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
        name: "lorem",
        description: "Lorem ipsum dolor sit amet.",
    },
};

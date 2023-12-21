import type { StoryFn, Meta } from '@storybook/react';
import {
    AppEditControllerProps, AppEditController
} from "./edit";
import { enqueueSnackbar } from 'notistack';
import { Field, useFormState } from 'react-final-form';
import { ApplicationData } from '@secma/base';
import { SecMaContextProvider } from '../../user-controller';
import { FormDebugger } from '@vebgen/mui-rff-debug';



// The properties passed to each story.
type StoryProps = AppEditControllerProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'concerns/apps/edit',
    tags: [],
    component: AppEditController,
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
                        <input type="text" {...input} placeholder="Slug" />
                        {
                            meta.touched &&
                            meta.error &&
                            <span>{meta.error}</span>
                        }
                    </div>
                )}
            </Field>
            <Field name="title">
                {({ input, meta }) => (
                    <div>
                        <label>Title</label>
                        <input type="text" {...input} placeholder="Title" />
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

}) => {

    const onSuccess = (result: ApplicationData) => {
        enqueueSnackbar("[EditController] onSuccess");
    }

    return (
        <SecMaContextProvider value={{
            signIn: (() => { }) as any,
            signOut: () => { },
            user_name: undefined,
            expires: 0,
            permissions: ["admin", "user"],
            token: "token"
        }}>
            <AppEditController
                onSuccess={onSuccess}
            >
                <Viewer />
                <FormDebugger />
            </AppEditController>
        </SecMaContextProvider>
    );
};


/**
 * The default story.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

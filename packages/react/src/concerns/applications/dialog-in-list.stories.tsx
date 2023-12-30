import type { StoryFn, Meta } from '@storybook/react';
import { JsonViewer } from '@textea/json-viewer';
import {
    AppEditDialogInList, AppEditDialogInListProps
} from "./dialog-in-list";
import { AppListContextProvider } from './list';
import { SecMaContextProvider } from '../../user-controller';
import { enqueueSnackbar } from 'notistack';



// The properties passed to each story.
type StoryProps = AppEditDialogInListProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'concerns/apps/edit-in-list',
    tags: [],
    component: AppEditDialogInList,
    parameters: {
        fetchMock: {
            mocks: [
                {// list
                    matcher: {
                        url: "path:/mng/apps/test",
                        method: 'DELETE',
                    },
                    response: {
                        id: "test",
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

const Inner = ({
    onSuccess,
    onCancel,
    initialValues
}: {
    onSuccess?: (initialValues: any) => void;
    onCancel?: () => void;
    initialValues?: any;
}) => {
    return (
        <div>
            <p>
                The properties of the <code>Inner</code> component
                are populated by the outer <code>AppEditDialogInList</code>
                component.
            </p>
            <button onClick={() => onSuccess!(initialValues)}>Submit</button>
            <button onClick={() => onCancel!()}>Cancel</button>
            <JsonViewer value={initialValues} rootName="initialValues" />
        </div>
    );
}


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = () => {
    return (
        <SecMaContextProvider value={{
            signIn: (() => { }) as any,
            signOut: () => { },
            expires: 123545,
            permissions: ["app:u"],
            user_name: "lorem",
        }}>
            <AppListContextProvider value={{
                canDelete: true,
                beginDelete: () => { },
                mode: "edit",
                current: "test",
                data: {
                    "test": {
                        id: "test",
                        slug: "Test",
                    }
                },
                clearCurrent: () => { },
                addNewItem: () => { enqueueSnackbar("Added"); },
                editItem: () => { enqueueSnackbar("Edited"); },
            } as any}>
                <AppEditDialogInList>
                    <Inner />
                </AppEditDialogInList>
            </AppListContextProvider>
        </SecMaContextProvider>
    );
};


/**
 * The default story.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

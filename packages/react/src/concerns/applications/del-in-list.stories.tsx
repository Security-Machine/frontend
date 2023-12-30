import type { StoryFn, Meta } from '@storybook/react';
import { JsonViewer } from '@textea/json-viewer';
import {
    AppDelDialogInList, AppDelDialogInListProps
} from "./del-in-list";
import { AppListContextProvider } from './list';
import { SecMaContextProvider } from '../../user-controller';



// The properties passed to each story.
type StoryProps = AppDelDialogInListProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'concerns/apps/del-in-list',
    tags: [],
    component: AppDelDialogInList,
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
    onConfirm,
    onCancel,
    record
}: {
    onConfirm?: () => void;
    onCancel?: () => void;
    record?: any;
}) => {
    return (
        <div>
            <p>
                The properties of the <code>Inner</code> component
                are populated by the outer <code>AppDelDialogInList</code>
                component.
            </p>
            <button onClick={() => onConfirm!()}>Submit</button>
            <button onClick={() => onCancel!()}>Cancel</button>
            <JsonViewer value={record} rootName="record" />
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
            permissions: ["app:d"],
            user_name: "lorem",
        }}>
            <AppListContextProvider value={{
                canDelete: true,
                beginDelete: () => { },
                mode: "delete",
                current: "test",
                data: {
                    "test": {
                        id: "test",
                        name: "Test",
                    }
                },
                clearCurrent: () => { },
                removeItem: () => { },
            } as any}>
                <AppDelDialogInList>
                    <Inner />
                </AppDelDialogInList>
            </AppListContextProvider>
        </SecMaContextProvider>
    );
};


/**
 * The default story.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

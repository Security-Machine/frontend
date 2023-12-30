import type { StoryFn, Meta } from '@storybook/react';
import { JsonViewer } from '@textea/json-viewer';


import { SecMaContextProvider } from '../../user-controller';
import {
    PermListController, PermListControllerProps, usePermListContext
} from './list';


// The properties passed to each story.
type StoryProps = PermListControllerProps & {
    user_name?: string
};


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'concerns/perms/list',
    tags: [],
    component: PermListController,
    args: {
        user_name: "john",
    },
    parameters: {
        fetchMock: {
            mocks: [
                {// list
                    matcher: {
                        url: "path:/perm/app/ten/",
                        method: 'GET',
                    },
                    response: ["lorem", "ipsum"],
                    options: {
                        delay: 1000,
                    }
                },
                { // read
                    matcher: {
                        url: "path:/perm/app/ten/lorem",
                        method: 'GET',
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
                { // read
                    matcher: {
                        url: "path:/perm/app/ten/ipsum",
                        method: 'GET',
                    },
                    response: {
                        name: "ipsum",
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


// The inner component that displays the context data.
const Viewer = () => {
    const {
        beginEdit,
        beginDelete,
        setCurrent,
        clearCurrent,
        reloadList,
        resetList,
        ...rest
    } = usePermListContext();
    return (
        <JsonViewer value={rest} rootName="PermListController result" />
    )
}


// The permissions of the user.
const permissions: string[] = [
    "perms:r", "perm:c", "perm:r", "perm:u", "perm:d"
];


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = ({
    user_name
}) => {
    return (
        <SecMaContextProvider value={{
            signIn: (() => { }) as any,
            signOut: () => { },
            expires: 123545,
            permissions,
            user_name,
        }}>
            <PermListController appSlug='app' tenSlug='ten'>
                <Viewer />
            </PermListController>
        </SecMaContextProvider>
    );
};


/**
 * The default story.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};


/**
 * No logged-in user.
 */
export const NoUser: StoryFn<StoryProps> = Template.bind({});
NoUser.args = {
    user_name: undefined,
};

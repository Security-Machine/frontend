import type { StoryFn, Meta } from '@storybook/react';
import { JsonViewer } from '@textea/json-viewer';


import { SecMaContextProvider } from '../../user-controller';
import {
    UserListController, UserListControllerProps, useUserListContext
} from './list';


// The properties passed to each story.
type StoryProps = UserListControllerProps & {
    user_name?: string
};


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'concerns/users/list',
    tags: [],
    component: UserListController,
    args: {
        user_name: "john",
    },
    parameters: {
        fetchMock: {
            mocks: [
                {// list
                    matcher: {
                        url: "path:/users/app/ten/",
                        method: 'GET',
                    },
                    response: ["lorem", "ipsum"],
                    options: {
                        delay: 1000,
                    }
                },
                { // read
                    matcher: {
                        url: "path:/users/app/ten/lorem",
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
                        url: "path:/users/app/ten/ipsum",
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
    } = useUserListContext();
    return (
        <JsonViewer value={rest} rootName="UserListController result" />
    )
}


// The permissions of the user.
const permissions: string[] = ["users:r", "user:c", "user:r", "user:u", "user:d"];


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
            <UserListController appSlug='app' tenSlug='ten'>
                <Viewer />
            </UserListController>
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

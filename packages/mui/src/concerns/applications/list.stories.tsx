import type { StoryFn, Meta } from '@storybook/react';
import { AppListController, SecMaContextProvider } from '@secma/react';
import { enqueueSnackbar } from 'notistack';

import type { AppListProps } from './list';
import { AppList } from './list';


// The properties passed to each story.
type StoryProps = AppListProps & {
    permissions: string[];
    user_name?: string;
};


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'concerns/applications/List',
    tags: [],
    component: AppList,
    args: {},
    parameters: {
        fetchMock: {
            mocks: [
                {// list
                    matcher: {
                        url: "path:/mng/apps/",
                        method: 'GET',
                    },
                    response: ["lorem", "ipsum"],
                    options: {
                        delay: 1000,
                    }
                },
                { // read
                    matcher: {
                        url: "path:/mng/apps/lorem",
                        method: 'GET',
                    },
                    response: {
                        slug: "lorem",
                        title: "Lorem",
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
                        url: "path:/mng/apps/ipsum",
                        method: 'GET',
                    },
                    response: {
                        slug: "ipsum",
                        title: "Ipsum",
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


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = ({
    user_name,
    permissions,
    ...args
}) => (
    <SecMaContextProvider value={{
        signIn: (() => { }) as any,
        signOut: () => { },
        user_name,
        expires: 0,
        permissions,
        token: "token"
    }}>
        <AppListController>
            <AppList {...args} />
        </AppListController>
    </SecMaContextProvider>
);


/**
 * Default story has a logged-in user with all permissions.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {
    user_name: "bobby",
    permissions: ["apps:r", "app:c", "app:r", "app:u", "app:d"],
};


/**
 * A story without a logged-in user.
 */
export const NotLoggedIn: StoryFn<StoryProps> = Template.bind({});
NotLoggedIn.args = {
    user_name: undefined,
    permissions: ["apps:r", "app:c", "app:r", "app:u", "app:d"],
};


/**
 * A story with a logged-in user but without any relevant permission.
 */
export const NoPermission: StoryFn<StoryProps> = Template.bind({});
NoPermission.args = {
    user_name: "bobby",
    permissions: ["ipsum", "dolor"],
};


/**
 * A story with a logged-in user that can only see the list.
 */
export const ListPermOnly: StoryFn<StoryProps> = Template.bind({});
ListPermOnly.args = {
    user_name: "bobby",
    permissions: ["apps:r"],
};


/**
 * A story with a logged-in user that can create new items.
 */
export const WithCreateOnly: StoryFn<StoryProps> = Template.bind({});
WithCreateOnly.args = {
    user_name: "bobby",
    permissions: ["apps:r", "app:c"],
};


/**
 * A story with a logged-in user that can read existing items.
 */
export const WithReadOnly: StoryFn<StoryProps> = Template.bind({});
WithReadOnly.args = {
    user_name: "bobby",
    permissions: ["apps:r", "app:r"],
};


/**
 * A story with a logged-in user that can edit existing items.
 */
export const WithEditOnly: StoryFn<StoryProps> = Template.bind({});
WithEditOnly.args = {
    user_name: "bobby",
    permissions: ["apps:r", "app:u"],
};


/**
 * A story with a logged-in user that can delete existing items.
 */
export const WithDelOnly: StoryFn<StoryProps> = Template.bind({});
WithDelOnly.args = {
    user_name: "bobby",
    permissions: ["apps:r", "app:d"],
};

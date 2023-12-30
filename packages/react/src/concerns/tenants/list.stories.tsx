import type { StoryFn, Meta } from '@storybook/react';
import { JsonViewer } from '@textea/json-viewer';


import { SecMaContextProvider } from '../../user-controller';
import {
    TenantListController, TenantListControllerProps, useTenantListContext
} from './list';


// The properties passed to each story.
type StoryProps = TenantListControllerProps & {
    user_name?: string
};


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'concerns/tenants/list',
    tags: [],
    component: TenantListController,
    args: {
        user_name: "john",
    },
    parameters: {
        fetchMock: {
            mocks: [
                {// list
                    matcher: {
                        url: "path:/tenants/app/",
                        method: 'GET',
                    },
                    response: ["lorem", "ipsum"],
                    options: {
                        delay: 1000,
                    }
                },
                { // read
                    matcher: {
                        url: "path:/tenants/app/lorem",
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
                        url: "path:/tenants/app/ipsum",
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
    } = useTenantListContext();
    return (
        <JsonViewer value={rest} rootName="TenantListController result" />
    )
}


// The permissions of the user.
const permissions: string[] = ["tenants:r", "tenant:c", "tenant:r", "tenant:u", "tenant:d"];


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
            <TenantListController appSlug='app'>
                <Viewer />
            </TenantListController>
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

import type { StoryFn, Meta } from '@storybook/react';

import { PageGuard, PageGuardProps } from "./page-guard";
import { SecMaContextProvider } from '../user-controller';


// The properties passed to each story.
interface StoryProps {
    permissions: PageGuardProps["permissions"];
    userPermissions: PageGuardProps["permissions"];
    user_name?: string;
}


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'utility/PageGuard',
    tags: [],
    component: PageGuard as any,
    args: {
        permissions: [],
        userPermissions: [],
        user_name: undefined,
    },
};
export default storybookConfig;


/**
 * Rendered when the user is not authorized.
 */
const Unauthorized = () => (
    <div>
        <p>Unauthorized</p>
    </div>
)


/**
 * Rendered when the user is authorized.
 */
const Authorized = () => (
    <div>
        <p>Authorized</p>
    </div>
)


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = ({
    permissions,
    userPermissions,
    user_name,
}) => (
    <SecMaContextProvider value={{
        user_name,
        expires: 0,
        permissions: userPermissions,
        token: undefined,
        signIn: (() => { }) as any,
        signOut: () => { },
    }}>
        <PageGuard
            unauthorized={<Unauthorized />}
            permissions={permissions}
        >
            <Authorized />
        </PageGuard>
    </SecMaContextProvider>
);


/**
 * The user is logged in, but does not have the required permissions.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {
    permissions: ["abc", "def"],
    userPermissions: ["xyz", "klm", "abc", "def"],
    user_name: 'lorem',
};


/**
 * The user is not logged in, we're redirected to the
 * login page.
 */
export const NotLoggedIn: StoryFn<StoryProps> = Template.bind({});
NotLoggedIn.args = {};


/**
 * The user is logged in, but does not have any permissions.
 */
export const NoPerm: StoryFn<StoryProps> = Template.bind({});
NoPerm.args = {
    permissions: ["abc", "def"],
    userPermissions: [],
    user_name: 'lorem',
};


/**
 * The user is logged in, but does not have the required permissions.
 */
export const RequiredPermMissing: StoryFn<StoryProps> = Template.bind({});
RequiredPermMissing.args = {
    permissions: ["abc", "def"],
    userPermissions: ["xyz", "klm"],
    user_name: 'lorem',
};


/**
 * The user is logged in, the page requires no permissions.
 */
export const NoPermRequired: StoryFn<StoryProps> = Template.bind({});
NoPermRequired.args = {
    permissions: [],
    userPermissions: [],
    user_name: 'lorem',
};

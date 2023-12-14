import type { StoryFn, Meta } from '@storybook/react';
import { SimpleController as G11nController } from '@vebgen/g11n';
import enMessages from '../../i18n/en.json';
import { Link, RouterProvider, createMemoryRouter } from 'react-router-dom';

import type { AppLayoutProps } from './layout';
import { AppLayout } from './layout';


// The properties passed to each story.
type StoryProps = AppLayoutProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'top-level/App Layout',
    tags: [],
    component: AppLayout,
    args: {

    },
    parameters: {
        docs: {
            // Without it storybook crashes.
            source: { code: "why?" },
        },
    },
};
export default storybookConfig;


const APage = () => (
    <div>
        <p>First page</p>
        <p><Link to="/other">Another page</Link></p>
    </div>
)


const AnotherPage = () => (
    <div>
        <p>Another page</p>
        <p><Link to="/">First page</Link></p>
    </div>
)


const router = createMemoryRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <APage />,
            },
            {
                path: "/other",
                element: <AnotherPage />,
            },
        ]
    },
], {
    initialEntries: ["/"],
    initialIndex: 1,
});


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = (args) => (
    <G11nController messages={{ "en": enMessages }} initialLocale='en'>
        <RouterProvider router={router} />
    </G11nController>
);


/**
 * The default story.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

import type { StoryFn, Meta } from '@storybook/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { Error404Page } from './error-404';


// Common configuration for all stories.
const storybookConfig: Meta = {
    title: 'top-level/Error 404',
    tags: ['controller'],
    component: Error404Page,
    args: {},
};
export default storybookConfig;


const router = createMemoryRouter([
    {
        path: "/xyz",
        element: <Error404Page />,
        errorElement: <Error404Page />,
    },
], {
    initialEntries: ["/"],
    initialIndex: 1,
});


// Base for all stories in this file.
const Template: StoryFn = () => (
    <RouterProvider router={router} />
);


/**
 * The default story.
 */
export const Default: StoryFn = Template.bind({});
Default.args = {};

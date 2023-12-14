import type { StoryFn, Meta } from '@storybook/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { SimpleController as G11nController } from '@vebgen/g11n';

import enMessages from '../../i18n/en.json';
import { Error404Page } from './error-404';

// The properties passed to each story.
type StoryProps = {};


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
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
const Template: StoryFn<StoryProps> = () => (
    <G11nController messages={{ "en": enMessages }} initialLocale='en'>
        <RouterProvider router={router} />
    </G11nController>
);


/**
 * The default story.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

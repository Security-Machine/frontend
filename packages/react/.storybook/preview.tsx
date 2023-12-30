import React from 'react';
import { SimpleController as G11nController } from '@vebgen/g11n';
import { Preview } from '@storybook/react';

import enMessages from '../i18n/en.json';
import { SecMaAppContextProvider } from '../src/app-controller';
import { SnackbarProvider } from 'notistack';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';


const messages = {
    en: enMessages,
};


export const parameters = {
    fetchMock: {
        // When the story is reloaded (or you navigate to a new
        // story, this addon will be reset and a list of
        // previous mock matches will be sent to the browser’s
        // console if "debug" is true.
        debug: true,

        // Do any additional configuration of fetch-mock, e.g.
        // setting fetchMock.config or calling other fetch-mock
        // API methods. This function is given the fetchMock
        // instance as its only parameter and is called after
        // mocks are added but before catchAllMocks are added.
        useFetchMock: (fetchMock: any) => {
            fetchMock.config.overwriteRoutes = false;
        },

        // After each story’s `mocks` are added, these catch-all
        // mocks are added.
        catchAllMocks: [
            // { matcher: { url: 'path:/endpoint1' }, response: 200 },
            // { matcher: { url: 'path:/endpoint2' }, response: 200 },
        ],

        // A simple list of URLs to ensure that calls to
        // `fetch( [url] )` don’t go to the network. The mocked
        // fetch response will use HTTP status 404 to make it
        // easy to determine one of the catchAllURLs was matched.
        // These mocks are added after any catchAllMocks.
        catchAllURLs: [
            // This is equivalent to the mock object:
            // {
            //   matcher: { url: 'begin:http://example.com/' },
            //   response: { status: 404 },
            // }
            // 'http://localhost:4603/',
            'http://example.com/',
        ],
    },
    docs: {
        source: {
            code: "hello world",
        },
    },
};

const NotLoggedIn = () => (
    <div>
        <h4>Not logged in</h4>
        <p>Routes that need an active user redirect here</p>
    </div>
);


// Wrap all stories in common providers.
const preview: Preview = {
    decorators: [
        (Story) => {
            const router = createMemoryRouter([
                {
                    path: "/",
                    element: <Story />,
                    index: true,
                },
                {
                    path: "/loginPath",
                    element: <NotLoggedIn />,
                    index: true,
                },
            ], {
                initialEntries: ["/"],
                initialIndex: 1,
            });
            return (
                <SecMaAppContextProvider value={{
                    loginPath: "loginPath",
                    apiUrl: "http://example.com",
                    adminPrefix: "admin",
                }}>
                    <G11nController messages={messages} initialLocale='en'>
                        <SnackbarProvider />
                        <RouterProvider router={router} />
                    </G11nController>
                </SecMaAppContextProvider>
            )
        },
    ],
};





export default preview;

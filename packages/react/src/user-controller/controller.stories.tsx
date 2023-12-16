import type { StoryFn, Meta } from '@storybook/react';
import { SimpleController as G11nController } from '@vebgen/g11n';
import { JsonViewer } from '@textea/json-viewer'
import jwt_encode from "jwt-encode";

import enMessages from "../../i18n/en.json"
import { SecMaController, SecMaControllerProps } from "./controller";
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useSecMaContext } from './context';


// The properties passed to each story.
type StoryProps = SecMaControllerProps;

// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'controller',
    tags: [],
    component: SecMaController,
    args: {
        onError: () => { enqueueSnackbar("Error signing in") },
        onSignIn: () => { enqueueSnackbar("Signed in") },
        onSignOut: () => { enqueueSnackbar("Signed out") },
        appSlug: "app",
        tenantSlug: "tenant",
        timeout: 1000,
    },
    parameters: {
        fetchMock: {
            mocks: [
                {
                    matcher: {
                        url: "path:/token/app/tenant",
                        method: 'POST',
                    },
                    response: {
                        "access_token": jwt_encode({
                            sub: "dolor",
                            exp: "sit",
                            scopes: ["amet"],
                        }, "abcdef"),
                        "token_type": "bearer"
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


// Rendered inside the controller.
const ControllerViewer = ({
    timeout
}: StoryProps) => {
    const {
        signIn,
        signOut,
        ...rest
    } = useSecMaContext();
    return (
        <div>
            <p>Controller Content</p>
            <JsonViewer value={rest} />
            <button
                onClick={() => signOut()}
                type="button"
            >
                Sign Out
            </button>
            <button
                onClick={() => signIn("abcd", "1234")}
                type="button"
            >
                Sign In
            </button>
            {(!timeout || timeout > 1000) && (
                <p>
                    The mock API delay is set to 1 second. You can generate an
                    error by setting the <em>timeout</em> argument to a value
                    lower than 1000.
                </p>
            )}
        </div>
    );
}


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = (args) => (
    <G11nController messages={{ "en": enMessages }} initialLocale='en'>
        <SnackbarProvider />
        <SecMaController {...args}>
            <ControllerViewer {...args} />
        </SecMaController>
    </G11nController>
);


/**
 * The default story.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};


/**
 * The story that generates an error at sign-in.
 */
export const WithError: StoryFn<StoryProps> = Template.bind({});
WithError.args = {
    timeout: 10,
};

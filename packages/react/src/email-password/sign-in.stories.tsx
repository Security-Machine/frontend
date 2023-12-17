import type { StoryFn, Meta } from '@storybook/react';
import { SimpleController as G11nController } from '@vebgen/g11n';
import { FormDebugger } from '@vebgen/mui-rff-debug'
import { Field } from 'react-final-form';
import { JsonViewer } from '@textea/json-viewer'
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import jwt_encode from "jwt-encode";

import enMessages from "../../i18n/en.json"
import { SecMaController, useSecMaContext } from '../user-controller';
import { SignInForm, SignInFormProps } from "./sign-in";

// Uses https://storybook.js.org/addons/storybook-addon-fetch-mock

// The properties passed to each story.
type StoryProps = SignInFormProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'email-pass/SignIn',
    tags: [],
    component: SignInForm,
    args: {
        onSignIn: () => { },
        isExisting: true,
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
                },
            ]
        }
    }
};
export default storybookConfig;

const ControllerViewer = () => {
    const {
        signIn,
        signOut,
        ...rest
    } = useSecMaContext();
    return (
        <div>
            <p>Controller Content</p>
            <JsonViewer value={rest} />
            <button onClick={() => signOut()} type="button">Sign Out</button>
        </div>
    );
}

// Base for all stories in this file.
const Template: StoryFn<StoryProps> = (args) => {

    return (
        <G11nController messages={{ "en": enMessages }} initialLocale='en'>
            <SnackbarProvider />
            <SecMaController
                onError={() => { enqueueSnackbar("Error signing in") }}
                onSignIn={() => { enqueueSnackbar("Signed in") }}
                onSignOut={() => { enqueueSnackbar("Signed out") }}
                appSlug="app"
                tenantSlug="tenant"
            >
                <SignInForm {...args}>
                    <Field name="username">
                        {({ input, meta }) => (
                            <div>
                                <input
                                    type="text"
                                    {...input}
                                    placeholder="Email or username"
                                />
                                {
                                    meta.touched &&
                                    meta.error &&
                                    <span>{meta.error}</span>
                                }
                            </div>
                        )}
                    </Field>
                    <Field name="password">
                        {({ input, meta }) => (
                            <div>
                                <input
                                    type="text"
                                    {...input}
                                    placeholder="Password"
                                />
                                {
                                    meta.touched &&
                                    meta.error &&
                                    <span>{meta.error}</span>
                                }
                            </div>
                        )}
                    </Field>
                    <Field name="rememberMe" type="checkbox">
                        {({ input, meta }) => (
                            <div>
                                <input
                                    type="checkbox"
                                    title='Remember me'
                                    {...input}
                                />
                                {
                                    meta.touched &&
                                    meta.error &&
                                    <span>{meta.error}</span>
                                }
                                <label>Remember me</label>
                            </div>
                        )}
                    </Field>
                    <button type="submit">Sign in</button>
                    <ControllerViewer />
                    <FormDebugger />
                </SignInForm>
            </SecMaController>
        </G11nController>
    );
}

/**
 * The default story.
 */
export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};

/**
 * The story for signing up.
 */
export const SignUp: StoryFn<StoryProps> = Template.bind({});
SignUp.args = {
    isExisting: false,
};

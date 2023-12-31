import { SecMaContextProvider, SignInFormProps } from "@secma/react";
import type { StoryFn, Meta } from '@storybook/react';
import { enqueueSnackbar } from 'notistack';

import { SignInMuiForm } from "./sign-in";


// The properties passed to each story.
type StoryProps = SignInFormProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'email-password/sign-in',
    tags: [],
    component: SignInMuiForm,
    args: {
        onSignIn: () => { enqueueSnackbar("Signed In"); },
    },
};
export default storybookConfig;


// Base for all stories in this file.
export const Default: StoryFn<StoryProps> = (args) => (
    <SecMaContextProvider value={{
        signIn: (username: string, password: string) => {
            enqueueSnackbar(
                `Signed In request by ${username} with password ${password}`
            );
            return Promise.resolve({
                token: "lorem",
                sub: "ipsum",
                exp: 12345,
                scopes: ["dolor", "sit"]
            });
        },
        signOut: () => { },
        expires: 123545,
        permissions: [""],
        user_name: undefined,
    }}>
        <SignInMuiForm {...args} />
    </SecMaContextProvider>
)

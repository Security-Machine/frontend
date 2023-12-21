import type { StoryFn, Meta } from '@storybook/react';
import { enqueueSnackbar } from 'notistack';

import {
    PageTitle as PageTitleComponent,
    TheText as TheTextComponent,
    UsernameField as UsernameFieldComponent,
    PasswordField as PasswordFieldComponent,
    RememberField as RememberFieldComponent,
    MainButton as MainButtonComponent,
    TheLink as TheLinkComponent,
    LostPasswordLink as LostPasswordLinkComponent,
} from "./common";
import { Form } from 'react-final-form';


// Common configuration for all stories.
const storybookConfig: Meta = {
    title: 'email-password/common',
    tags: [],
    args: {},
};
export default storybookConfig;


export const PageTitle: StoryFn = () => (
    <PageTitleComponent>
        Content
    </PageTitleComponent>
);


export const TheText: StoryFn = () => (
    <Form
        onSubmit={() => { enqueueSnackbar("[TheText] Form Submit") }}
        render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
                <TheTextComponent name="lorem">
                    Content
                </TheTextComponent>
            </form>
        )}
    />
);


export const UsernameField: StoryFn = () => (
    <Form
        onSubmit={() => { enqueueSnackbar("[UsernameField] Form Submit") }}
        render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
                <UsernameFieldComponent />
            </form>
        )}
    />
);


export const PasswordField: StoryFn = () => (
    <Form
        onSubmit={() => { enqueueSnackbar("[PasswordField] Form Submit") }}
        render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
                <PasswordFieldComponent />
            </form>
        )}
    />
);


export const RememberField: StoryFn = () => (
    <Form
        onSubmit={() => { enqueueSnackbar("[RememberField] Form Submit") }}
        render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
                <RememberFieldComponent />
            </form>
        )}
    />
);


export const MainButton: StoryFn = () => (
    <Form
        onSubmit={() => { enqueueSnackbar("[MainButton] Form Submit") }}
        render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
                <MainButtonComponent>
                    Content
                </MainButtonComponent>
            </form>
        )}
    />
);


export const TheLink: StoryFn = () => (
    <Form
        onSubmit={() => { enqueueSnackbar("[TheLink] Form Submit") }}
        render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
                <TheLinkComponent to="/missing-page">
                    Content
                </TheLinkComponent>
            </form>
        )}
    />
);


export const LostPasswordLink: StoryFn = () => (
    <Form
        onSubmit={() => { enqueueSnackbar("[TheLink] Form Submit") }}
        render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
                <LostPasswordLinkComponent />
            </form>
        )}
    />
);

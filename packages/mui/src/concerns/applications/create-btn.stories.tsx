import type { StoryFn, Meta } from '@storybook/react';
import { AppListContextProvider } from '@secma/react';
import { enqueueSnackbar } from 'notistack';


import type { CreateAppButtonProps } from './create-btn';
import { CreateAppButton } from './create-btn';


// The properties passed to each story.
type StoryProps = CreateAppButtonProps & {
    canCreate: boolean
};


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'concerns/applications/Create Button',
    tags: [],
    component: CreateAppButton,
    args: {
        canCreate: true,
    },
};
export default storybookConfig;


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = ({
    canCreate,
    ...args
}) => (
    <AppListContextProvider value={{
        canCreate,
        beginCreate: () => { enqueueSnackbar("beginCreate"); },
    } as any}>
        <CreateAppButton {...args} />
    </AppListContextProvider>
);


export const CanCreate: StoryFn<StoryProps> = Template.bind({});
CanCreate.args = {
    canCreate: true,
};


export const CannotCreate: StoryFn<StoryProps> = Template.bind({});
CannotCreate.args = {
    canCreate: false,
};

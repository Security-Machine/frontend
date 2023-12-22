import type { StoryFn, Meta } from '@storybook/react';
import type { PageHeaderProps } from "./page-header";
import { PageHeader } from "./page-header";
import { DateTime } from 'luxon';


// The properties passed to each story.
type StoryProps = PageHeaderProps;

// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'components/PageHeader',
    tags: [],
    component: PageHeader,
    args: {
        title: "A title",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing " +
            "elit. Nullam euismod, nisl eget aliquam ultricies, nunc " +
            "nisl aliquet nunc, vitae ali",
        created: DateTime.utc(),
        updated: DateTime.utc(),
    },
};
export default storybookConfig;


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = (args) => (
    <PageHeader {...args} />
);


export const Default: StoryFn<StoryProps> = Template.bind({});
Default.args = {};


export const NoCreatedDate: StoryFn<StoryProps> = Template.bind({});
NoCreatedDate.args = {
    created: undefined
};


export const NoUpdatedDate: StoryFn<StoryProps> = Template.bind({});
NoUpdatedDate.args = {
    updated: undefined
};


export const NoDescription: StoryFn<StoryProps> = Template.bind({});
NoDescription.args = {
    description: undefined
};

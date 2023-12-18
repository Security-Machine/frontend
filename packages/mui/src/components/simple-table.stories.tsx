import type { StoryFn, Meta } from '@storybook/react';

import { SimpleTable, SimpleTableProps } from "./simple-table";


// The properties passed to each story.
type StoryProps = SimpleTableProps;


// Common configuration for all stories.
const storybookConfig: Meta<StoryProps> = {
    title: 'components/SimpleTable',
    tags: [],
    component: SimpleTable,
    args: {
        data: {
            "lorem": "ipsum",
            "dolor": "sit",
            "amet": "consectetur",
            "adipiscing": "elit",
        },
        header: ["Key", "Value"],
    },
};
export default storybookConfig;


// Base for all stories in this file.
const Template: StoryFn<StoryProps> = (args) => (
    <SimpleTable {...args} />
);


export const WithHeader: StoryFn<StoryProps> = Template.bind({});
WithHeader.args = {};


export const WithoutHeader: StoryFn<StoryProps> = Template.bind({});
WithoutHeader.args = {
    header: undefined,
};

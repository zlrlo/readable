import { Meta, Story } from '@storybook/react';
import { Hashtag, HashtagProps } from './hashtag';

export default {
  title: 'Button/Hashtag',
  component: Hashtag,
} as Meta;

const Template: Story<HashtagProps> = args => <Hashtag {...args}>tag</Hashtag>;

export const Default = Template.bind({});

export const Colorful = Template.bind({});

Colorful.args = {
  defaultColor: 'bg-gray-400',
  hoverColor: 'bg-black',
};

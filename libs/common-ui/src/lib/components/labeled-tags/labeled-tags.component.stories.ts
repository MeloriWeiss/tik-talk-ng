import type { Meta, StoryObj } from '@storybook/angular';
import { LabeledTagsComponent } from './labeled-tags.component';
import { expect } from 'storybook/test';

const meta: Meta<LabeledTagsComponent> = {
  component: LabeledTagsComponent,
  title: 'LabeledTagsComponent',
};
export default meta;

type Story = StoryObj<LabeledTagsComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/labeled-tags/gi)).toBeTruthy();
  },
};

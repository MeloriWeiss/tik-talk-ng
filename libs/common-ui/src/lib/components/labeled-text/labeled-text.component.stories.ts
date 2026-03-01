import type { Meta, StoryObj } from '@storybook/angular';
import { LabeledTextComponent } from './labeled-text.component';
import { expect } from 'storybook/test';

const meta: Meta<LabeledTextComponent> = {
  component: LabeledTextComponent,
  title: 'LabeledTextComponent',
};
export default meta;

type Story = StoryObj<LabeledTextComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/labeled-text/gi)).toBeTruthy();
  },
};

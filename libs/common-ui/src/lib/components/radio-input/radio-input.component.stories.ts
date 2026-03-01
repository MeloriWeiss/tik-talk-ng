import type { Meta, StoryObj } from '@storybook/angular';
import { RadioInputComponent } from './radio-input.component';
import { expect } from 'storybook/test';

const meta: Meta<RadioInputComponent> = {
  component: RadioInputComponent,
  title: 'RadioInputComponent',
};
export default meta;

type Story = StoryObj<RadioInputComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/radio-input/gi)).toBeTruthy();
  },
};

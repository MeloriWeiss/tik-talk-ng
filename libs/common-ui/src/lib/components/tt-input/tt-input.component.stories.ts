import type { Meta, StoryObj } from '@storybook/angular';
import { TtInputComponent } from './tt-input.component';
import { expect } from 'storybook/test';

const meta: Meta<TtInputComponent> = {
  component: TtInputComponent,
  title: 'TtInputComponent',
};
export default meta;

type Story = StoryObj<TtInputComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/tt-input/gi)).toBeTruthy();
  },
};

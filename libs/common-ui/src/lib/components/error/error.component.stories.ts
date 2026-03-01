import type { Meta, StoryObj } from '@storybook/angular';
import { ErrorComponent } from './error.component';
import { expect } from 'storybook/test';

const meta: Meta<ErrorComponent> = {
  component: ErrorComponent,
  title: 'ErrorComponent',
};
export default meta;

type Story = StoryObj<ErrorComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/error/gi)).toBeTruthy();
  },
};

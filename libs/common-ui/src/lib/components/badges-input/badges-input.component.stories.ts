import type { Meta, StoryObj } from '@storybook/angular';
import { BadgesInputComponent } from './badges-input.component';
import { expect } from 'storybook/test';

const meta: Meta<BadgesInputComponent> = {
  component: BadgesInputComponent,
  title: 'BadgesInputComponent',
};
export default meta;

type Story = StoryObj<BadgesInputComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/badges-input/gi)).toBeTruthy();
  },
};

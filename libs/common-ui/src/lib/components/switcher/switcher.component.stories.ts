import type { Meta, StoryObj } from '@storybook/angular';
import { SwitcherComponent } from './switcher.component';
import { expect } from 'storybook/test';

const meta: Meta<SwitcherComponent> = {
  component: SwitcherComponent,
  title: 'SwitcherComponent',
};
export default meta;

type Story = StoryObj<SwitcherComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/switcher/gi)).toBeTruthy();
  },
};

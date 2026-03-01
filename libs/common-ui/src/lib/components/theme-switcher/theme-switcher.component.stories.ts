import type { Meta, StoryObj } from '@storybook/angular';
import { ThemeSwitcherComponent } from './theme-switcher.component';
import { expect } from 'storybook/test';

const meta: Meta<ThemeSwitcherComponent> = {
  component: ThemeSwitcherComponent,
  title: 'ThemeSwitcherComponent',
};
export default meta;

type Story = StoryObj<ThemeSwitcherComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/theme-switcher/gi)).toBeTruthy();
  },
};

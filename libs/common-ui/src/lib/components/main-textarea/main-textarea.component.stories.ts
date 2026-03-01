import type { Meta, StoryObj } from '@storybook/angular';
import { MainTextareaComponent } from './main-textarea.component';
import { expect } from 'storybook/test';

const meta: Meta<MainTextareaComponent> = {
  component: MainTextareaComponent,
  title: 'MainTextareaComponent',
};
export default meta;

type Story = StoryObj<MainTextareaComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/main-textarea/gi)).toBeTruthy();
  },
};

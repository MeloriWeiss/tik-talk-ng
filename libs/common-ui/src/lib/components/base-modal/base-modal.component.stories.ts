import type { Meta, StoryObj } from '@storybook/angular';
import { BaseModalComponent } from './base-modal.component';
import { expect } from 'storybook/test';

const meta: Meta<BaseModalComponent> = {
  component: BaseModalComponent,
  title: 'BaseModalComponent',
};
export default meta;

type Story = StoryObj<BaseModalComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/base-modal/gi)).toBeTruthy();
  },
};

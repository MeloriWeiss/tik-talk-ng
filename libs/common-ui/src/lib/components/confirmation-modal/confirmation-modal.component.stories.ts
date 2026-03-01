import type { Meta, StoryObj } from '@storybook/angular';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { expect } from 'storybook/test';

const meta: Meta<ConfirmationModalComponent> = {
  component: ConfirmationModalComponent,
  title: 'ConfirmationModalComponent',
};
export default meta;

type Story = StoryObj<ConfirmationModalComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/confirmation-modal/gi)).toBeTruthy();
  },
};

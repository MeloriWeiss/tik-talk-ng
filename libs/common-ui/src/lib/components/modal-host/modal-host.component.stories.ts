import type { Meta, StoryObj } from '@storybook/angular';
import { ModalHostComponent } from './modal-host.component';
import { expect } from 'storybook/test';

const meta: Meta<ModalHostComponent> = {
  component: ModalHostComponent,
  title: 'ModalHostComponent',
};
export default meta;

type Story = StoryObj<ModalHostComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/modal-host/gi)).toBeTruthy();
  },
};

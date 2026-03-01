import type { Meta, StoryObj } from '@storybook/angular';
import { AddressInputDropdownComponent } from './address-input-dropdown.component';
import { expect } from 'storybook/test';

const meta: Meta<AddressInputDropdownComponent> = {
  component: AddressInputDropdownComponent,
  title: 'AddressInputDropdownComponent',
};
export default meta;

type Story = StoryObj<AddressInputDropdownComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/address-input-dropdown/gi)).toBeTruthy();
  },
};

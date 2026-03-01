import type { Meta, StoryObj } from '@storybook/angular';
import { PortalComponent } from './portal.component';
import { expect } from 'storybook/test';

const meta: Meta<PortalComponent> = {
  component: PortalComponent,
  title: 'PortalComponent',
};
export default meta;

type Story = StoryObj<PortalComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/portal/gi)).toBeTruthy();
  },
};

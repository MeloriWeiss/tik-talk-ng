import type { Meta, StoryObj } from '@storybook/angular';
import { SidebarPortalComponent } from './sidebar-portal.component';
import { expect } from 'storybook/test';

const meta: Meta<SidebarPortalComponent> = {
  component: SidebarPortalComponent,
  title: 'SidebarPortalComponent',
};
export default meta;

type Story = StoryObj<SidebarPortalComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/sidebar-portal/gi)).toBeTruthy();
  },
};

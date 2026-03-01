import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarCircleComponent } from './avatar-circle.component';
import { expect } from 'storybook/test';

const meta: Meta<AvatarCircleComponent> = {
  component: AvatarCircleComponent,
  title: 'AvatarCircleComponent',
};
export default meta;

type Story = StoryObj<AvatarCircleComponent>;

export const Primary: Story = {
  args: {
    defaultAvatarUrl: 'assets/svg/avatar-placeholder.svg',
  },
};

export const Heading: Story = {
  args: {},
  // play: async ({ canvas }) => {
  //   await expect(canvas.getByText(/avatar-circle/gi)).toBeTruthy();
  // },
};

import type { Meta, StoryObj } from '@storybook/angular';
import { ChangePhotoTooltipComponent } from './change-photo-tooltip.component';
import { expect } from 'storybook/test';

const meta: Meta<ChangePhotoTooltipComponent> = {
  component: ChangePhotoTooltipComponent,
  title: 'ChangePhotoTooltipComponent',
};
export default meta;

type Story = StoryObj<ChangePhotoTooltipComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/change-photo-tooltip/gi)).toBeTruthy();
  },
};

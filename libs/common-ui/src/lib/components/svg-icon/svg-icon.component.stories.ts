import type { Meta, StoryObj } from '@storybook/angular';
import { SvgIconComponent } from './svg-icon.component';
import { expect } from 'storybook/test';

const meta: Meta<SvgIconComponent> = {
  component: SvgIconComponent,
  title: 'SvgIconComponent',
};
export default meta;

type Story = StoryObj<SvgIconComponent>;

export const Primary: Story = {
  args: {
    icon: '',
  },
};

export const Heading: Story = {
  args: {
    icon: '',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/svg-icon/gi)).toBeTruthy();
  },
};

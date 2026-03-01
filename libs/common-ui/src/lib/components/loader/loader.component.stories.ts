import type { Meta, StoryObj } from '@storybook/angular';
import { LoaderComponent } from './loader.component';
import { expect } from 'storybook/test';

const meta: Meta<LoaderComponent> = {
  component: LoaderComponent,
  title: 'LoaderComponent',
  parameters: {},
};
export default meta;

type Story = StoryObj<LoaderComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    const loader = await canvas.findByRole('status');
    await expect(loader).toBeVisible();
    await expect(loader).toHaveClass('loader');
  },
};

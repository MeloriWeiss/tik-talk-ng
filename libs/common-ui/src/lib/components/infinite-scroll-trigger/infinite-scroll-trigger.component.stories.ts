import type { Meta, StoryObj } from '@storybook/angular';
import { InfiniteScrollTriggerComponent } from './infinite-scroll-trigger.component';
import { expect } from 'storybook/test';

const meta: Meta<InfiniteScrollTriggerComponent> = {
  component: InfiniteScrollTriggerComponent,
  title: 'InfiniteScrollTriggerComponent',
};
export default meta;

type Story = StoryObj<InfiniteScrollTriggerComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/infinite-scroll-trigger/gi)).toBeTruthy();
  },
};

import type { Meta, StoryObj } from '@storybook/angular';
import { TtFormInputComponent } from './form-input.component';
import { expect } from 'storybook/test';

const meta: Meta<TtFormInputComponent> = {
  component: TtFormInputComponent,
  title: 'TtFormInputComponent',
};
export default meta;

type Story = StoryObj<TtFormInputComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/form-input/gi)).toBeTruthy();
  },
};

import type { Meta, StoryObj } from '@storybook/angular';
import { LabeledFormFieldWrapperComponent } from './labeled-form-field-wrapper.component';
import { expect } from 'storybook/test';

const meta: Meta<LabeledFormFieldWrapperComponent> = {
  component: LabeledFormFieldWrapperComponent,
  title: 'LabeledFormFieldWrapperComponent',
};
export default meta;

type Story = StoryObj<LabeledFormFieldWrapperComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/labeled-form-field-wrapper/gi)).toBeTruthy();
  },
};

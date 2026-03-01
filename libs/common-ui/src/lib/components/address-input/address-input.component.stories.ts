import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { AddressInputComponent } from './address-input.component';
import { expect } from 'storybook/test';
import { storybookProviders } from '../../../../.storybook/storybook.providers';
import { DadataService } from '../../data/index';

const meta: Meta<AddressInputComponent> = {
  component: AddressInputComponent,
  title: 'AddressInputComponent',
  decorators: [
    applicationConfig({
      providers: [...storybookProviders, DadataService],
    }),
  ],
};
export default meta;

type Story = StoryObj<AddressInputComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/address-input/gi)).toBeTruthy();
  },
};

import type { Meta, StoryObj } from '@storybook/angular';
import { EditableAvatarCircleComponent } from './editable-avatar-circle.component';
import { expect } from 'storybook/test';

const meta: Meta<EditableAvatarCircleComponent> = {
  component: EditableAvatarCircleComponent,
  title: 'EditableAvatarCircleComponent',
};
export default meta;

type Story = StoryObj<EditableAvatarCircleComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/editable-avatar-circle/gi)).toBeTruthy();
  },
};

import type { Meta, StoryObj } from '@storybook/vue3';

import Checkbox from './Checkbox.vue';
import Label from '../label/Label.vue';
import { ref } from 'vue';
import type { ComponentProps } from 'vue-component-type-helpers';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    disabled: false,
  },
  render: (args) => ({
    components: { Checkbox, Label },
    setup() {
      const modelValue = ref('no');
      return { args, modelValue };
    },
    template: `
    <Label>
      <Checkbox v-model="modelValue" true-value="yes" false-value="no" v-bind="args" />
      I agree
    </Label>
    `
  }),
} satisfies Meta<ComponentProps<typeof Checkbox> & {
  disabled?: boolean;
}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
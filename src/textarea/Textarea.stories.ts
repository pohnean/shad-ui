import type { Meta, StoryObj } from '@storybook/vue3';

import Textarea from './Textarea.vue';
import { ref } from 'vue';
import type { ComponentProps } from 'vue-component-type-helpers';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    disabled: false,
  },
  render: (args) => ({
    components: { Textarea },
    setup() {
      const modelValue = ref('Lorem ipsum');

      return { args, modelValue };
    },
    template: '<Textarea v-model="modelValue" v-bind="args" />'
  }),
} satisfies Meta<ComponentProps<typeof Textarea> & {
  disabled?: boolean;
  rows?: number;
}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    rows: 5,
  }
};
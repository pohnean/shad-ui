import type { Meta, StoryObj } from '@storybook/vue3';

import Select from './Select.vue';
import { ref } from 'vue';
import type { ComponentProps } from 'vue-component-type-helpers';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'UI/Select',
  component: Select,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    disabled: false,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ]
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const modelValue = ref('');
      return { args, modelValue };
    },
    template: `<Select v-model="modelValue" v-bind="args" />
    `
  }),
} satisfies Meta<ComponentProps<typeof Select> & {
  disabled?: boolean;
  options?: { label: string; value: string }[];
  modelValue?: string;
}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OptionGroups: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      {
        label: 'Group',
        options: [
          { label: 'Option A', value: 'optionA' },
          { label: 'Option B', value: 'optionB' },
          { label: 'Option C', value: 'optionC' },
        ]
      },
      { label: 'Option 3', value: 'option3' },
    ]
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
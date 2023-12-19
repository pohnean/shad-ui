import type { Meta, StoryObj } from '@storybook/vue3';

import Progress from './Progress.vue';
import type { ComponentProps } from 'vue-component-type-helpers';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'UI/Progress',
  component: Progress,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    modelValue: 65,
  },
  render: (args) => ({
    components: { Progress },
    setup() { return { args }; },
    template: '<Progress v-bind="args" />'
  }),
} satisfies Meta<ComponentProps<typeof Progress> & {
}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
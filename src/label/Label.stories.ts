import type { Meta, StoryObj } from '@storybook/vue3';

import Label from './Label.vue';
import type { ComponentProps } from 'vue-component-type-helpers';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'UI/Label',
  component: Label,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    text: 'Label'
  },
  render: (args) => ({
    components: { Label },
    setup() { return { args }; },
    template: '<Label>{{ args.text }}</Label>'
  }),
} satisfies Meta<ComponentProps<typeof Label> & {
  text?: string;
}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
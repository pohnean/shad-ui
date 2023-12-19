import type { Meta, StoryObj } from '@storybook/vue3';
import type { ComponentProps } from 'vue-component-type-helpers';
import Input from '@/input/Input.vue';
import Button from '@/button/Button.vue';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'UI/Input',
  component: Input,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {},
  argTypes: {
    placeholder: {control: 'text'},
  }
} satisfies Meta<ComponentProps<typeof Input> & {
  type?: string;
  placeholder?: string;
}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Email',
  },
};

export const File: Story = {
  args: {
    type: 'file',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Email',
    disabled: true,
  },
};

export const WithButton: Story = {
  args: {
    placeholder: 'Email',
  },
  render: (args) => ({
    components: {Input, Button},
    setup() {
      return {args};
    },
    template: `
      <div class="flex gap-2">
        <Input v-bind="args"/>
        <Button>Button</Button>
      </div>`
  }),
};
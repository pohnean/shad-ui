import type { ComponentProps } from 'vue-component-type-helpers';
import { Mail } from 'lucide-vue-next';
import Button from './Button.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      defaultValue: 'primary'
    },
    size: {control: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'md'},
    withIcon: {control: 'boolean'},
    loading: {control: 'boolean'},
    onClick: {action: 'clicked'},
  },
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'md',
    loading: false,
    withIcon: false,
  },
  render: (args) => ({

    components: {Button, Mail},
    setup() {
      return {
        args
      };
    },
    template: `
      <Button @click="args.onClick" v-bind="args">
        <mail v-if="args.withIcon"/>
        {{ args.label }}
      </Button>`,
  }),
} satisfies Meta<ComponentProps<typeof Button> & {
  label?: string;
  loading?: boolean;
  withIcon?: boolean;
  onClick?: () => void;
}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary',
    variant: 'secondary',
    size: 'md',
  },
};

export const Destructive: Story = {
  args: {
    label: 'Destructive',
    variant: 'destructive',
    size: 'md',
  },
};


export const Outline: Story = {
  args: {
    label: 'Outline',
    variant: 'outline',
    size: 'md',
  },
};

export const Ghost: Story = {
  args: {
    label: 'Ghost',
    variant: 'ghost',
    size: 'md',
  },
};

export const Link: Story = {
  args: {
    label: 'Link',
    variant: 'link',
    size: 'md',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Primary',
    variant: 'primary',
    size: 'md',
    withIcon: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};


export const Loading: Story = {
  args: {
    loading: true,
  },
};

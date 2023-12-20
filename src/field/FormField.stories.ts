import type { Meta, StoryObj } from '@storybook/vue3';
import FormField from '@/field/FormField.vue';
import { Input } from '@/input';
import { Form } from 'vee-validate';
import { Button } from '@/button';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'UI/FormField',
  component: FormField,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    label: 'Username',
    helpText: 'This is your public display name.',
    error: '',
  },
  render: (args) => ({
    components: {Form, FormField, Input, Button},
    setup() {
      function onSubmit(values: any) {
        console.log('onSubmit', values)
      }

      const schema = {
        username(value: string) {
          if (!value) {
            return 'Username is required';
          }

          return true;
        }
      }

      return {args, onSubmit, schema};
    },
    template: `
      <Form @submit="onSubmit" class="space-y-4" :validation-schema="schema">
        <FormField v-bind="args">
          <Input placeholder="Enter Your Username"/>
        </FormField>
        <Button>Submit</Button>
      </Form>`
  }),
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'username',
  }
};

export const Invalid: Story = {
  args: {
    name: 'username',
    error: 'Invalid username',
  }
};
import type { Meta, StoryObj } from '@storybook/vue3';

import Spinner from './Spinner.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'UI/Spinner',
  component: Spinner,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  render: (args) => ({
    components: { Spinner },
    setup() { return { args }; },
    template: '<Spinner />'
  }),
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

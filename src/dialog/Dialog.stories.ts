import type { Meta, StoryObj } from '@storybook/vue3';

import { ref } from 'vue';
import Dialog from './Dialog.vue';
import { Button } from '@/button';
import { DialogClose, DialogDescription, DialogHeader, DialogTitle } from '@/dialog/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  render: (args) => ({
    components: {
      Dialog,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogClose,
      Button,
    },
    setup() {
      const showDialog = ref(false);
      const isSaving = ref(false);

      return {
        args,
        isSaving,
        showDialog,
        save: () => new Promise((resolve) => {
          isSaving.value = true;
          setTimeout(() => {

            resolve(true);
            showDialog.value = false;
            isSaving.value = false;
          }, 1000);
        }),
      };
    },
    template: `
      <Dialog
          title="Edit Profile"
          description="Make changes to your profile here. Click save when you're done."
          :trigger="{ label: 'Open' }"
          v-model="showDialog"
      >
        <template #body>
          <div class="space-y-4">
            Content
          </div>
        </template>
        <template #footer>
          <Button @click="showDialog = false" variant="secondary">
            Cancel
          </Button>
          <Button @click="save" :loading="isSaving">
            Save
          </Button>
        </template>
      </Dialog>
    `
  }),
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
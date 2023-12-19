<script setup lang="ts">
import { DialogRoot } from 'radix-vue';
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogContent } from '.';
import { useVModel } from '@vueuse/core';
import { ref } from 'vue';
import type { ComponentProps } from 'vue-component-type-helpers';
import Button from '@/button/Button.vue';

const props = withDefaults(defineProps<{
  modelValue?: boolean
  title?: string
  description?: string
  trigger?: ComponentProps<typeof Button>
}>(), {
  modelValue: undefined,
});

const opened = props.modelValue !== undefined
    ? useVModel(props, 'modelValue')
    : ref(false);

const open = () => {
  opened.value = true;
};

const close = () => {
  opened.value = false;
};
</script>

<template>
  <DialogRoot v-model:open="opened">
    <slot name="trigger" v-bind="{ open, close }">
      <Button v-if="trigger" v-bind="trigger" @click="open"/>
    </slot>
    <DialogContent>
      <DialogHeader v-if="title || description">
        <DialogTitle v-if="title">{{ title }}</DialogTitle>
        <DialogDescription v-if="description">{{ description }}</DialogDescription>
      </DialogHeader>
      <slot name="body" v-bind="{ open, close }"></slot>
      <DialogFooter v-if="$slots.footer">
        <slot name="footer" v-bind="{ open, close }"></slot>
      </DialogFooter>
    </DialogContent>
  </DialogRoot>
</template>

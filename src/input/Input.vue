<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { InputFieldSymbol, InputHasErrorSymbol, InputIdSymbol } from '../field';

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  id?: string
  name?: string
  modelValue?: string | number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const id = inject(InputIdSymbol, props.id);
const field = inject(InputFieldSymbol, null);
const hasError = inject(InputHasErrorSymbol);

const name = props.name ?? field?.name?.value ?? '';
const value = computed({
  get: () => props.modelValue ?? field?.value?.value as string ?? '',
  set: (value) => {
    if (field?.value) {
      field.value.value = value;
    } else {
      emit('update:modelValue', value);
    }
  },
});

const {class: className, ...rest} = useAttrs()
</script>

<template>
  <input
      v-model="value"
      :id="id"
      :name="name"
      :class="cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          hasError && 'ring-destructive ring-2 placeholder:text-destructive',
      className ?? ''
      )"
      v-bind="rest"
  />
</template>

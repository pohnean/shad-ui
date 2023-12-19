<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue'
import { CheckIcon } from '@radix-icons/vue'
import { cn } from '@/lib/utils'
import { computed } from 'vue';

const props = withDefaults(defineProps<CheckboxRootProps & {
  modelValue: any;
  trueValue?: any;
  falseValue?: any;
}>(), {
  modelValue: false,
  trueValue: true,
  falseValue: false,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>()

const forwarded = useForwardPropsEmits(props, emits)

const checked = computed<boolean>({
  get() {
    return props.modelValue === props.trueValue;
  },
  set(value) {
    if (value) {
      emits('update:modelValue', props.trueValue);
    } else {
      emits('update:modelValue', props.falseValue);
    }
  },
});
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    v-model:checked="checked"
    :class="
      cn('peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
         $attrs.class ?? '')"
  >
    <CheckboxIndicator class="flex h-full w-full items-center justify-center text-current">
      <CheckIcon class="h-4 w-4" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

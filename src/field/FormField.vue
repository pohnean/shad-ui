<script setup lang="ts">
import { Label } from '@/label';
import { cn } from '@/lib/utils';
import { useId } from 'radix-vue';
import { useField, useIsFormTouched } from 'vee-validate';
import { computed, provide } from 'vue';
import { InputFieldSymbol, InputHasErrorSymbol, InputIdSymbol } from '@/field/index';

const props = defineProps<{
  name: string;
  label?: string;
  error?: string;
  helpText?: string;
}>();

const field = useField(props.name);
const isTouched = useIsFormTouched();

const errorMessage = computed(() => {
  if (props.error) {
    return props.error;
  }

  return field?.errorMessage?.value ?? '';
});

const hasError = computed(() => {
  if (props.error) {
    return true;
  }

  return isTouched.value && Boolean(errorMessage.value);
});

const id = useId();

provide(InputIdSymbol, id);
provide(InputFieldSymbol, field);
provide(InputHasErrorSymbol, hasError);
</script>
<template>
  <div :class="cn('space-y-2', $attrs.class ?? '')">
    <slot name="label">
      <Label
          v-if="label"
          :for="id"
          :class="cn(hasError && 'text-destructive')"
      >{{ label }}</Label>
    </slot>
    <slot/>
    <slot name="error" v-if="hasError">
      <p class="text-[0.8rem] font-medium text-destructive">{{ errorMessage }}</p>
    </slot>
    <slot name="help" v-if="helpText">
      <p v-if="helpText" class="text-[0.8rem] text-muted-foreground">{{ helpText }}</p>
    </slot>
  </div>
</template>
<style scoped>

</style>
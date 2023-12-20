<script setup lang="ts">
import type { SelectRootEmits, SelectRootProps } from 'radix-vue';
import { SelectRoot, useForwardPropsEmits } from 'radix-vue';
import {
  // Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '.';

interface OptionGroup {
  label: string;
  options: Option[];
}

interface Option {
  label: string;
  value: string;
}

const props = withDefaults(defineProps<SelectRootProps & {
  options: (OptionGroup | Option)[];
  placeholder?: string;
  clearable?: boolean;
  disabled?: boolean;
}>(), {
  placeholder: 'Select an option',
  clearable: true,
  disabled: false,
});

const emits = defineEmits<SelectRootEmits>();

const { options, ...rest } = props;

const forwarded = useForwardPropsEmits(rest, emits)
</script>

<template>
  <SelectRoot v-bind="forwarded">
    <SelectTrigger :disabled="disabled">
      <SelectValue :placeholder="placeholder"/>
    </SelectTrigger>
    <SelectContent>

      <template v-for="(option, i) in options">
        <template v-if="'options' in option">
          <SelectGroup :key="`group-${i}`">
            <SelectLabel>{{ option.label }}</SelectLabel>
            <template v-for="child in option.options" :key="child.value">
              <SelectItem :value="child.value">
                {{ child.label }}
              </SelectItem>
            </template>
          </SelectGroup>
        </template>
        <template v-else>
          <SelectItem :value="option.value" :key="option.value">
            {{ option.label }}
          </SelectItem>
        </template>
      </template>
    </SelectContent>
  </SelectRoot>
</template>

<script setup lang="ts">
import { Label, type LabelProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<LabelProps & { class?: string }>()
</script>

<template>
  <Label
    v-bind="props"
    :class="
      cn(
        'w-label text-sm font-medium tracking-tight text-foreground flex items-center gap-2',
        props.class,
      )
    "
  >
    <slot />
  </Label>
</template>

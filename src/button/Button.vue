<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { buttonVariants } from './index'
import { cn } from '@/lib/utils'
import Spinner from '@/spinner/Spinner.vue';

interface Props extends PrimitiveProps {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant']
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size']
  as?: string
  label?: string
  disabled?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  as: 'button',
  size: 'md',
  variant: 'primary',
  disabled: false,
  loading: false,
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="[
        cn(buttonVariants({ variant, size }), $attrs.class ?? ''),
        loading && 'disabled:text-transparent',
    ]"
    :disabled="loading || disabled"
  >
    <div v-if="loading" class="absolute inset-0 grid place-items-center">
      <Spinner class="h-5 text-white" />
    </div>
    <slot>{{ label }}</slot>
  </Primitive>
</template>

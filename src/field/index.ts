import type { ComputedRef, InjectionKey } from 'vue';
import type { FieldContext } from 'vee-validate';

export const InputFieldSymbol = Symbol() as InjectionKey<FieldContext>;
export const InputIdSymbol = Symbol() as InjectionKey<string>;
export const InputHasErrorSymbol = Symbol() as InjectionKey<ComputedRef<boolean>>;
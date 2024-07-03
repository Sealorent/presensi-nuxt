<!-- AppInputText.vue -->
<template>
  <div>
    <UFormGroup :label="label" :name="nameInput">
      <UInput 
        v-model="inputValue"
        :placeholder="placeholder"
        :id="id"
        :class="inputClasses"
        :required="required"
        :type="type"
      />
    </UFormGroup>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

// Define props
interface Props {
  nameInput?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  id?: string;
  required?: boolean;
  modelValue?: string | number;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

// Reactive state for v-model binding
const inputValue = ref(props.modelValue);

// Watch for changes to the modelValue prop and update the inputValue
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
});

// Watch for changes to inputValue and emit update:modelValue event
watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
});

// Computed class for dynamic styling
const inputClasses = [
  'text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full',
  'dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
];
</script>

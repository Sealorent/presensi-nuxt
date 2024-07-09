<template>
    <select class="select select-info" v-model="selectedOption">
        <option :disabled="true" :value="defaultOptionValue">{{ defaultOption }}</option>
        <option v-for="(option, index) in options" :key="index" value="option.value">{{ option.label }}</option>
    </select>
</template>
  
<script lang="ts">
import { type OptionInterface } from '~/commons/interface/option-interface';
import { defineComponent } from 'vue';
 
export default defineComponent({
  props: {
    options: {
      type: Array as () => OptionInterface[],
      required: true,
    },
    defaultOption: {
      type: String as () => string,
      default: 'Select language',
    },
    defaultOptionValue: {
      type: String as () => string,
      default: '',
    },
  },
  data() {
    return {
      selectedOption: this.defaultOptionValue,
    };
  },
});
</script>

<style scoped>
/* Your custom styles here */
</style>
  
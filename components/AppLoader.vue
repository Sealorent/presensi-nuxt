<template>
  <div
    v-if="hasState"
    class="absolute z-10 flex items-center justify-center w-full h-screen bg-gray-400 bg-opacity-40"
  >
    <div v-if="showLoading">
      <span class="w-10 h-10 loading loading-bars text-primaryColors"></span>
    </div>
    <div v-if="isSuccess" class="success">Success!</div>
    <div v-if="hasError" class="container w-1/2 p-5 bg-red-500 rounded-xl">
      <div class="flex flex-col alert-error gap-y-4">
        <font-awesome-icon icon="exclamation-circle" class="text-white" size="xl" />
        <span class="text-center text-white font-mulish">{{ stateStore.state.error }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStateStore } from '~/stores/app/app-state-store.ts'
const stateStore = useAppStateStore()

const isLoading = computed(() => stateStore.state.loading)
const isSuccess = computed(() => stateStore.state.success)
const hasError = computed(() => stateStore.state.error)
const showLoading = computed(() => isLoading.value && !isSuccess.value && !hasError.value)
const hasState = computed(() => stateStore.state.state)
</script>

<style>
.success {
  color: green;
}
.error {
  color: red;
}
</style>

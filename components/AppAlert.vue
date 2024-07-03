<template>
  <div class="absolute top-0 z-10 w-1/2" v-if="alertAppStore.state.show">
    <div class="toast toast-center toast-middle">
      <div class="flex flex-row alert" :class="getType(alertAppStore.state.type)">
        <font-awesome-icon :icon="getIcon(alertAppStore.state.type)" />
        <span class="font-mulish">{{ alertAppStore.state.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppAlertStore, type AlertType } from '~/stores/app/app-alert-store.ts'

const alertAppStore = useAppAlertStore()

const icons: Record<AlertType, string> = {
  success: 'check-circle',
  warning: 'triangle-exclamation',
  danger: 'exclamation-circle',
  info: 'info-circle'
}

const constType: Record<AlertType, string> = {
  success: 'alert-success',
  warning: 'alert-warning',
  danger: 'alert-error',
  info: 'alert-info'
}

const getIcon = (alertType: AlertType) => {
  return ['fas', icons[alertType]]
}

const getType = (alertType: AlertType) => {
  return constType[alertType]
}
</script>

import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface AlertState {
  message: string
  type: AlertType
  show: boolean
}

export type AlertType = 'success' | 'warning' | 'danger' | 'info'

export const useAppAlertStore = defineStore('appAlert', () => {
  const state = reactive<AlertState>({
    message: '',
    type: 'info',
    show: false
  })

  function show(message: string, type: AlertType = 'info') {
    state.message = message
    state.type = type
    state.show = true
  }

  function clear() {
    state.show = false
  }

  function hide() {
    state.message = ''
  }

  return {
    state,
    show,
    clear,
    hide
  }
})

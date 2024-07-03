import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface AppState {
  loading: boolean
  success: boolean
  error: any
  state: boolean
  time: number
}

export const useAppStateStore = defineStore('state', () => {
  const state = reactive<AppState>({
    loading: false,
    success: false,
    error: '',
    state: false,
    time: import.meta.env.VITE_ERROR_TIMEOUT as number
  })

  function setLoading() {
    state.loading = true
    state.state = true
  }

  function setSuccess() {
    state.state = true
    state.success = true

    setTimeout(() => {
      clear()
    }, state.time)
  }

  function setError(error: any) {
    state.error = error
    state.state = true

    setTimeout(() => {
      clear()
    }, state.time)
  }

  function clear() {
    state.loading = false
    state.success = false
    state.error = ''
    state.state = false
  }

  return {
    state,
    setLoading,
    setSuccess,
    setError,
    clear
  }
})

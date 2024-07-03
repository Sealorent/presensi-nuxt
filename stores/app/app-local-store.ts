import { defineStore } from "pinia"
import { LocalStorageKey } from "~/enums/local-store.ts"

export const useAppLocalStore = defineStore('appLocalStorage', {
    state: () => ({
        // Initialize state if needed
    }),
    actions: {
        set(key: string, value: any) {
            if (typeof window !== 'undefined') {
                localStorage.setItem(key, JSON.stringify(value))
            } else {
                console.error('localStorage is not available. Unable to set item.')
            }
        },
        get(key: string) {
            if (typeof window !== 'undefined') {
                const item = localStorage.getItem(key)
                return item ? JSON.parse(item) : null
            } else {
                console.error('localStorage is not available. Unable to get item.')
                return null
            }
        },
        remove(key: string) {
            if (typeof localStorage !== 'undefined') {
                localStorage.removeItem(key)
            } else {
                console.error('localStorage is not available. Unable to remove item.')
            }
        },
        setUserLogin(value: any) {
            this.set(LocalStorageKey.USER_LOGIN, value)
        },
        getUserLogin() {
            return this.get(LocalStorageKey.USER_LOGIN)
        }
    }
})

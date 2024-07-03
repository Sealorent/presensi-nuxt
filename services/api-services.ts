import axios from 'axios'
import { useAuthStore } from '~/stores';

const URL_STATIC = import.meta.env.VITE_BASE_URL as string

// Axios instance with base URL
const axiosInstance = axios.create({
  baseURL: 'https://hrms.indoweb.id/presensi-new'
})

// Axios request interceptor to add token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore().getTokens() // Get token from store
  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
});


export const get = async (url: string, params: any) => {
  return await axiosInstance.get(url, { params })
}

export const post = async (url: string, data: any) => {
  return await axiosInstance.post(url, data)
}

export const put = async (url: string, data: any) => {
  return await axiosInstance.put(url, data)
}

<template>
    <div class="flex flex-col justify-center items-center bg-blue-50 min-h-screen">
      <NuxtImg 
        src="/logo/indoweb.png" 
        alt="Logo Indoweb.id"
        class="mb-4"
      />
      <h2 class="text-3xl font-bold mb-6">
        Welcome to Indoweb.id
      </h2>
      <UForm :schema="schema" :state="state" class="space-y-4 w-80 py-10" @submit="onSubmit">
        <AppInputText
          v-model="state.nip"
          nameInput="nip"
          label="NIP"
          placeholder="Enter your NIP"
          type="text"
          id="nip"
          required
        />
        <AppInputText
          v-model="state.password"
          nameInput="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          id="password"
          required
        />
        <UButton type="submit" class="w-full">
          Login
        </UButton>
      </UForm>
    </div>
  </template>
  
<script lang="ts" setup>
import { object, string, number, type InferType } from 'yup';
import { reactive } from 'vue';
import type { FormSubmitEvent } from '#ui/types';
import { useAuthStore, type ParameterLogin } from '~/stores';
  
  // Set up head for the page
  useHead({
    title: 'Login Presensi Indoweb.id',
    link: [
      { rel: 'icon', href: 'https://indoweb.id/wp-content/uploads/2023/09/cropped-fav-Logo-Indoweb-terbaru-32x32.png' },
      { rel: 'icon', href: 'https://indoweb.id/wp-content/uploads/2023/09/cropped-fav-Logo-Indoweb-terbaru-192x192.png', crossorigin: '' },
      { rel: 'apple-touch-icon', href: 'https://indoweb.id/wp-content/uploads/2023/09/cropped-fav-Logo-Indoweb-terbaru-180x180.png' }
    ]
  });
  
  // Define reactive state
  const state = reactive({
    nip: '202305',
    password: '123456'
  });
  
  // Define validation schema using Yup
  const schema = object({
    nip: string().required('NIP is required'),
    password: string().min(6, 'Password must be at least 6 characters long').required('Password is required')
  });
  
  // Define the schema type
  type Schema = InferType<typeof schema>;
  
  // Handle form submission
  async function onSubmit(
    event: FormSubmitEvent<Schema>
    ) {
        const data : ParameterLogin = {
            nip: state.nip,
            password: state.password
        }
        useAuthStore().login(data);
  }
  </script>
  
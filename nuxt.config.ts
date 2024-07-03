import type { NuxtPage } from "nuxt/schema"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  sourcemap: {
    server: true,
    client: true
  },
  runtimeConfig: {
    tokenMapbox: process.env.MAPBOX_ACCESS_TOKEN
  },
  hooks: {
    'pages:extend' (pages) {
      function setMiddleware (pages: NuxtPage[]) {
        for (const page of pages) {
          if (/* some condition */ true) {
            page.meta ||= {}
            // Note that this will override any middleware set in `definePageMeta` in the page
            page.meta.middleware = ['auth']
          }
          if (page.children) {
            setMiddleware(page.children)
          }
        }
      }
      setMiddleware(pages)
    }
  },
  modules: [
    "@nuxt/ui", 
    "@vite-pwa/nuxt",
     "@pinia/nuxt", 
     "@nuxt/image",
    "@pinia-plugin-persistedstate/nuxt",
    "@vesp/nuxt-fontawesome"
  ],
  fontawesome: {
    icons: {
      solid: ['dollar-sign', 'cog', 'circle', 'check', 'calendar'],
    }
  },
  pinia: {
    storesDirs: [
      './stores/**', 
      './custom-folder/stores/**'
    ],
  },

  pwa: {
    manifest: {
      name: "My Nuxt App",
      short_name: "My Nuxt App",
      description: "My Nuxt App description",
      theme_color: "#ffffff",
      lang: "en",
    },
  },
  
})
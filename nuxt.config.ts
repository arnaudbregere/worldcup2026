export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
  head: {
    htmlAttrs: { lang: 'fr' }
  }
  },
  css: ['~/assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/styles/_tokens.scss" as *;`
        }
      }
    }
  }
})
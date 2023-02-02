// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@nuxt/image-edge"],
  build: {
    transpile: ["trpc-nuxt"],
  },
});

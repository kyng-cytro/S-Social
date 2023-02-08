// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@nuxt/image-edge"],
  typescript: {
    strict: true,
  },
  app: {
    head: {
      charset: "UTF-8",
      viewport: "width=device-width, initial-scale=1",
      title: "S-Social",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Mini social media to test out nuxt, trpc & prisma",
        },
      ],
    },
  },
  build: {
    transpile: ["trpc-nuxt"],
  },
});

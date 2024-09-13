// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [ '@nuxtjs/tailwindcss' , "@nuxtjs/supabase"],
  supabase: {
    redirect: false
  },
  app: {
    head: {
      title: 'wat zu schauen',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Hier gibt es wat zu schauen.' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css' }
    	]
  }
  },
})
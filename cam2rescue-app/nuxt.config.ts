// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  //...
  runtimeConfig: {
    apiSecret: '1235',
    public: {
      apiBase: 'http://127.0.0.1:8000/'
      // apiBase: 'http://192.168.1.4:8000'
    }
  },

  app: {
    head: {
        title: "Pet Adoption | Rescue Pets | Donate to Animal Shelters",
        meta: [
          {name: 'description', content: 'Adopt a pet, rescue stray animals, and donate to animal shelters. Join us in making a difference in the lives of pets in need.'},
          {name: 'description', content: 'An Online Platform for pet recue and shelter'},
          { name: 'csrf-token', content: process.env.CSRF_TOKEN || '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/cam2rescue.ico' }],
      charset: "utf-8",
      viewport: "width-device-width, initial-scale=1",
    },
  },

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    "@pinia/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    "@nuxtjs/google-fonts",
  ],

  googleFonts: {
    display: "swap",
    families: {
      Inter: true
    }
  },

  devtools: {enabled: true},

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  compatibilityDate: '2024-07-26',
})
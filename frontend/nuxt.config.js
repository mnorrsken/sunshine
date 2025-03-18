export default {
  // Global page headers
  head: {
    title: 'sunshine',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS
  css: [],

  // Plugins to run before rendering page
  plugins: [
    '~/plugins/axios.js'
  ],

  // Auto import components
  components: true,

  // Modules for dev and build (recommended)
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module'
  ],

  // Modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  // Axios module configuration
  axios: {
    baseURL: 'http://localhost:5000'
  },

  // Proxy configuration
  proxy: {
    '/api/': {
      target: 'http://localhost:5000',
      pathRewrite: { '^/api/': '' }
    }
  },

  // Build Configuration
  build: {}
}

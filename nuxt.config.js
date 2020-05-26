const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  env: {
    JWT_EXP: '< TOKEN EXPIRE IN SECOND. >',
    JWT_SECRET: '< JWT SECRET KEY. >',
    FACEBOOK_CLIENT_ID: '< FACEBOOK CLIENT ID. >',
    FACEBOOK_CLIENT_SECRET: '< FACEBOOK CLIENT SECRET. >',
    GOOGLE_CLIENT_ID: '< GOOGLE CLIENT ID. >',
    GOOGLE_CLIENT_SECRET: '< GOOGLE CLIENT SECRET. >',
    DB_NAME: '< DB NAME. >',
    DB_USERNAME: '< DB USERNAME. >',
    DB_PASSWORD: '< DB PASSWORD. >',
    DB_HOST: '< DB HOST. >',
    DB_DIALECT: '< DB TYPE (IN THIS EXAMPLE USE MYSQL). >',
    DB_POOL_MAX: '< DB POOL MAX. >',
    DB_POOL_MIN: '< DB POOL MIN. >',
    DB_POOL_ACQUIRE: '< DB POOL ACQUIRE. >',
    DB_POOL_IDLE: '< DB POOL IDLE. >'
  },
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Kanit&display=swap'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Montserrat:200,400,700&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#8ac165', failedColor: '#8ac165', continuous: true },
  /*
   ** Global CSS
   */
  css: ['~/static/css/main.css', 'sweetalert2/dist/sweetalert2.min.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/vuelidate', ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    [
      'vue-sweetalert2/nuxt',
      {
        confirmButtonColor: '#91d861',
        cancelButtonColor: '#f26c10'
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://localhost:3000/api'
  },
  auth: {
    strategies: {
      local: false,
      token: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: 'login',
            method: 'post',
            propertyName: 'token'
          },
          user: { url: 'users', method: 'get', propertyName: 'data' },
          logout: {
            url: 'logout',
            method: 'post',
            propertyName: 'data'
          }
        }
      }
    },
    redirect: {
      login: false,
      logout: false,
      home: false,
      callback: false
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#8ac165',
          secondary: '#f26c10',
          accent: colors.grey.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}

import colors from 'vuetify/es5/util/colors'

const { join } = require("path");
const { copySync, removeSync } = require("fs-extra");

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  srcDir: 'client/',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - client',
    title: 'client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/axios.js" },
    { src: "~/plugins/vee-validate.js" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  auth: {
    // https://auth.nuxtjs.org/api/options.html
    redirect: {
      login: "/auth",
      // logout: "/auth",
      logout: "/auth",
      callback: "/auth",
      home: '/app/dashboard'
    },
    // login: User will be redirected to this path if login is required.
    // logout: User will be redirected to this path if after logout, current route is protected.
    // home: User will be redirect to this path after login. (rewriteRedirects will rewrite this path)
    // callback: User will be redirected to this path by the identity provider after login. (Should match configured Allowed Callback URLs(or similar setting) in your app / client with the identity provider)
    // Each redirect path can be disabled by setting to false.Also you can disable all redirects by setting redirect to false
    // cookie:true,
    strategies: {
      'laravelSanctum': {
        provider: 'laravel/sanctum',
        url: process.env.APP_URL,
        endpoints: {
          csrf: {
            url: 'api/csrf-cookie', method: 'get',
          },
          // login: { url: '/api/v1/login', method: 'post' },
          login: { url: 'api/v1/login', method: 'post' },
          user: { url: 'api/user', method: 'get' },
          logout: { url: 'api/v1/logout', method: 'post' }
        },
        user: {
          property: 'data',
          autoFetch: true
        },
        token: {
          property: 'data.token',
          required: true,
          global: true,
          type: false,
          type: 'Bearer',
          name: 'Authorization',
          maxAge: 2592000
        },
      },

    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: true,
    // proxy: true,
    accept: 'application/json',
    baseURL: process.env.APP_URL,
  },
  loading: { color: '#7e3af2', height: '3px' },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: [ '~/assets/variables.scss' ],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [ "vee-validate/dist/rules" ],
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  },
  hooks: {
    generate: {
      done(generator)
      {
        // Copy dist files to public/_nuxt
        const publicDir = join(generator.nuxt.options.rootDir, "public");
        // removeSync(publicDir);
        // copySync(
        //   join(generator.nuxt.options.generate.dir, "_nuxt"),
        //   publicDir
        // );
        copySync(join(generator.nuxt.options.generate.dir), publicDir);
        // copySync(
        //   join(generator.nuxt.options.generate.dir, "200.html"),
        //   join(publicDir, "index.html")
        // );
        // removeSync(generator.nuxt.opstions.generate.dir);
      }
    }
  }
}

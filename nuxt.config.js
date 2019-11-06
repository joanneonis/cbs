const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~assets/scss/main.scss',
    'swiper/dist/css/swiper.css',
  ],

  styleResources: {
    scss: [
      '~assets/scss/functions/*.scss',
      '~assets/scss/mixins/*.scss',
      '~assets/scss/_config.scss',
      '~assets/scss/placeholders/*.scss',
      '~assets/scss/bootstrap/_variables.scss',
    ],
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/swiper.js', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/style-resources', 'nuxt-svg-loader'],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}

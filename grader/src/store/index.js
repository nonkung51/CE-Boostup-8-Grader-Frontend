  import Vue from 'vue'
  import Vuex from 'vuex'
  import question from './modules/question'
  // import products from './modules/products'
  // import createLogger from '../../../src/plugins/logger'

  Vue.use(Vuex)

  const debug = process.env.NODE_ENV !== 'production'

  export default new Vuex.Store({
      state: {
          apiToken: "12345"
      },
      methods: {
          setApiToken(token) {
              state.apiToken = token
          }
      },
      modules: {
          question
          // products
      },
      strict: debug,
      //   plugins: debug ? [createLogger()] : []
  })
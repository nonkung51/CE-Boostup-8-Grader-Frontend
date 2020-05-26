import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import router from './router'
import VueCodemirror from 'vue-codemirror'

import 'codemirror/lib/codemirror.css'

Vue.use(VueCodemirror,
    /* {
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */
)



Vue.config.productionTip = false

new Vue({
    vuetify,
    router,
    VueCodemirror,
    render: h => h(App)
}).$mount('#app')
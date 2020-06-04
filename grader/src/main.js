import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import router from './router'
import store from './store'

// Plugin
import VueCodemirror from 'vue-codemirror'
import VueCookies from 'vue-cookies'
import VueParticles from 'vue-particles'

import 'codemirror/lib/codemirror.css'

Vue.use(VueCodemirror)
Vue.use(VueCookies)
Vue.use(VueParticles)


Vue.config.productionTip = false


new Vue({
    vuetify,
    router,
    VueCodemirror,
    VueCookies,
    store, // vuex store
    render: h => h(App)
}).$mount('#app')
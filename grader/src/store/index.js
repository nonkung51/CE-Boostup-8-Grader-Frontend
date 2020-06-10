import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'
//import question from './modules/question';
//import user from './modules/user';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';



export default new Vuex.Store({
    state: {
        // usage console.log(this.$store.state.apiToken)
        apiToken: "12345"
    },
    mutations: {
        // usage this.$store.commit('setAPiToken',param1)
        setApiToken(state, token) {
            state.apiToken = token
        }
    },
    modules: {
        //question
        // products
    },
    strict: debug,
    plugins: [new VuexPersistence().plugin]
})
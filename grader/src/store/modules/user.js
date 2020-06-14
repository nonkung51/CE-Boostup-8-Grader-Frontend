export default { // eslint-disable-next-line no-unused-vars
    namespaced: true,
    state: {
        data: {
            username: "",
            detail: { email: "", avatar: "", name: "" },
            question_Done: {},
            submission: {}
        }
    },

    // eslint-disable-next-line no-unused-vars
    getters: {
        doneQuestion: state => {
            return state.questions.filter(el => el.status.done)
        },
    },

    // eslint-disable-next-line no-unused-vars
    mutations: {
        set(state, data) {
            // set user data here
            state.data = data
        },
        changeImage(state, url) {
            state.data.detail.avatar = url
        },
        clear(state) {
            console.log("clear")
            state.data = {
                username: "",
                detail: { email: "", avatar: "", name: "" },
                question_Done: {},
                submission: {}
            }
        }

    },
    // eslint-disable-next-line no-unused-vars
    actions: {}
}
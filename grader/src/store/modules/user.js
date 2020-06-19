import axios from 'axios'

const api = "https://deno.everythink.dev"

export default { // eslint-disable-next-line no-unused-vars
    namespaced: true,
    state: {
        data: {
            token: "",
            username: "",
            detail: { email: "", avatar: "", name: "" },
            submission: [],
            questions: [],
            codeSession: []
        }
    },

    // eslint-disable-next-line no-unused-vars
    getters: {
        getSubmission: state => {
            var data = state.data
            if (data.submission.length) {
                let arr = JSON.parse(JSON.stringify(data.submission))
                for (let i = 0; i < arr.length; i++) {
                    arr[i].i_d = i + 1;
                    var q = data.questions.filter(el => {
                        return el.id == arr[i].questionId
                    }).slice()
                    if (q[0]) {
                        let key = ["title", "rank", "finished", "id"]
                        key.forEach(key => {
                            arr[i][key] = q[0][key]
                        })
                    }
                }
                return arr.slice()
            }
            return []
        },
        getToken: state => {
            return state.data.token
        }
    },

    // eslint-disable-next-line no-unused-vars
    mutations: {
        setApiToken(state, token) {
            state.data.token = token
        },
        set(state, data) {
            state.data = data
        },
        setQuestions(state, data) {
            state.data.questions = data
        },
        setSubmission(state, data) {
            state.data.submission = data
        },
        changeImage(state, url) {
            state.data.detail.avatar = url
        },
        changeName(state, name) {
            state.data.detail.name = name
        },
        clear(state) {
            state.data = {
                token: "",
                username: "",
                detail: { email: "", avatar: "", name: "" },
                submission: [],
                questions: []
            }
        }

    },
    // eslint-disable-next-line no-unused-vars
    actions: {
        updateQuestion({ state, commit }) {
            var tok = state.data.token
            axios.get(api + "/api/v1/questions").then(res => {
                var allQuestion = res.data.data
                commit('setQuestions', allQuestion)
            }).catch(err => {
                console.log(err)
            })
            axios.post(api + '/api/v1/list_submission', {
                token: tok
            }).then(response => {
                var submission = response.data.data
                if (!submission) submission = []
                commit('setSubmission', submission)
            })
        },
        // autoSave({ state, commit }) {

        // }
    }
}
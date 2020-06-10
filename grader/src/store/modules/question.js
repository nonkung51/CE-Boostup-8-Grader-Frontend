// const state = () => ({
//     questions: {
//         id,
//         pdf_path,
//         detail: { difficulty, description },
//         status: {
//             done, // true/false 
//             result, // submit result
//             feedback, // submit feedback in case of compile error or something else
//             //....
//         },
//     }
// })

// const getters = {
//     doneQuestion: state => {
//         return state.questions.filter(el => el.status.done)
//     },
// }


// const actions = {
//     submit({ commit, state }, question, code) {
//         // api request to submit a code to grader
//         commit;
//         state;
//         question;
//         code;
//     },
//     //....
// }
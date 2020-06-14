<template>
<div class="ma-12" style="background:transparent;">
    <taskTable :tasks="tasks" title="All Questions" color="#42b983"></taskTable>
</div>
</template>

<script>
import taskTable from '@/components/miniComp/taskTable'

export default {
    components: {
        taskTable
    },
    data() {
        return {
            tasks: [{
                    title: "A+B",
                    id: "1",
                    rank: 2,
                    passed: "3234",
                    by: "Glairy",
                    status: "Passed",
                    status_col: "green", // front-end render
                },
                {
                    title: "Grading",
                    id: "2",
                    rank: 3,
                    passed: "3192",
                    by: "Glairy",
                    status: "Wrong",
                    status_col: "red", // front-end render
                },
                {
                    title: "Min-Max",
                    id: "3",
                    rank: 1,
                    passed: "3143",
                    by: "Glairy",
                    status: "Idle",
                    status_col: "grey", // front-end render
                },
                {
                    title: "Matrix Addition",
                    id: "4",
                    rank: 5,
                    passed: "3110",
                    by: "Glairy",
                    status: "Idle",
                    status_col: "grey", // front-end render
                },
                {
                    title: "A+B",
                    id: "1",
                    rank: 2,
                    passed: "3234",
                    by: "Glairy",
                    status: "Passed",
                    status_col: "green", // front-end render
                },
                {
                    title: "Grading",
                    id: "2",
                    rank: 1,
                    passed: "3192",
                    by: "Glairy",
                    status: "Wrong",
                    status_col: "red", // front-end render
                },
                {
                    title: "Min-Max",
                    id: "3",
                    rank: 0,
                    passed: "3143",
                    by: "Glairy",
                    status: "Idle",
                    status_col: "grey", // front-end render
                },
                {
                    title: "Matrix Addition",
                    id: "4",
                    rank: 0,
                    passed: "3110",
                    by: "Glairy",
                    status: "Idle",
                    status_col: "grey", // front-end render
                },
            ],
        }
    },
    created() {
        // this.axios.get('http://localhost:5000/api/v1/questions').then(response => {
        //     this.tasks = response.data.data;
        // })
    }
}
</script>

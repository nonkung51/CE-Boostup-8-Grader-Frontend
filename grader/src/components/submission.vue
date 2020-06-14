<template>
<div class="ma-12" style="background:transparent;">
    <taskTable :tasks="tasks" title="All Submission" color="indigo lignten-1"></taskTable>
</div>
</template>

<script>
import taskTable from './miniComp/taskTable'

export default {
    components: {
        taskTable
    },
    data() {
        return {
            tasks: [{
                    title: "A+B",
                    id: "1",
                    rank: 0,
                    passed: "3234",
                    by: "Glairy",
                    status: "Passed",
                    status_col: "green", // front-end render
                    list: "PPPPPPP"
                },
                {
                    title: "Grading",
                    id: "2",
                    rank: 1,
                    passed: "3192",
                    by: "Glairy",
                    status: "Wrong",
                    status_col: "red", // front-end render
                    list: "PPPPPPXTTTTT"
                },
                {
                    title: "Min-Max",
                    id: "3",
                    rank: 2,
                    passed: "3143",
                    by: "Glairy",
                    status: "Processing",
                    status_col: "grey", // front-end render
                    list: null
                },
                {
                    title: "Matrix Addition",
                    id: "4",
                    rank: 3,
                    passed: "3110",
                    by: "Glairy",
                    status: "Processing",
                    status_col: "grey", // front-end render
                    list: null
                },

            ],
            sortBy: 'rank',
            page: 1,
            sortDesc: false,
            search: '',
            itemsPerPage: 4,
            itemsPerPageArray: [4, 8, 12],
            rank_range: [0, 10]
        }
    },
}
</script>

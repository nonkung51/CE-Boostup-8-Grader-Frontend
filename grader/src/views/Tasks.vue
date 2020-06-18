<template>
<div class="ma-12" style="background:transparent;">
    <taskTable type="question" animation="swing-in-top-bck" :tasks="tasks" title="All Questions" color="#42b983"></taskTable>
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
            tasks: []
        }
    },
    created() {
        this.axios.get('http://localhost:8080/api/v1/questions').then(response => {
            this.tasks = response.data.data;
            for (var i = 0; i < this.tasks.length; i++) {
                this.tasks[i].i_d = i + 1;
            }
        })
    }
}
</script>

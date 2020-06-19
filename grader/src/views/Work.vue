<template>
<router-view></router-view>
<!-- dialog wait fetch data -->
</template>

<script>
export default {
    data() {
        return {

        }
    },
    created() {
        this.$store.dispatch('user/updateQuestion')
    }
}
</script>

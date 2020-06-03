<template>
<v-app id="app">

    <v-content justify="center" align="center" fill-height>
        <router-view />
    </v-content>
    <!-- <v-footer app color="#42b983" class="white--text">
        <span>CE-BoostUp Camp | 8</span>
        <v-spacer></v-spacer>
        <span>&copy; 2020</span>
    </v-footer> -->
</v-app>
</template>

<style lang="scss" scoped>
#app {
    font-family: Roboto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    // background: rgb(250, 250, 250);
}
</style>

<style>
.task-rounded-top {
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
}

.task-rounded-bot {
    border-bottom-left-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
}
</style>

<script>
export default {
    data() {
        return {

        };
    }
};
</script>

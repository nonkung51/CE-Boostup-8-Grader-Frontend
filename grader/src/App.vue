<template>
<v-app id="app">

    <v-content class="bg" justify="center" align="center" fill-height>
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
    background: rgb(250, 250, 250);
}

.bg {
    // background: url('assets/CECECECECE.png');
    // background-size: cover;
    // background-repeat: no-repeat;
    // background-position: center center;
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

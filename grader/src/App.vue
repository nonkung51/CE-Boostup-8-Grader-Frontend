<template>
<v-app id="app">
    <v-app-bar elevate-on-scroll dense color="white" app clipped-right>
        <!-- Title -->
        <v-toolbar-title class="mt-2">CE-BU 8 | Grader</v-toolbar-title>

        <!-- tabs menu -->
        <template v-slot:extension>
            <v-tabs align-with-title id="nav" slider-color="success">
                <v-tab to="/">Home</v-tab>
                <v-tab to="/task">Tasks</v-tab>
                <v-tab to="/coding">Coding</v-tab>
                <v-tab to="/submission">Submissions</v-tab>
            </v-tabs>
        </template>
        <!--  -->

        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click.stop="right = !right"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="right" fixed right temporary>
        <v-list v-if="login" dense>
            <!-- Profile -->
            <v-list-item>
                <v-icon @click.stop="right = !right">mdi-chevron-right</v-icon>
                <v-spacer></v-spacer>
                <v-list-item-content>
                    <v-list-item-title>Jane Smith</v-list-item-title>
                    <v-list-item-subtitle>Logged In</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar>
                    <v-img src="https://randomuser.me/api/portraits/women/75.jpg"></v-img>
                </v-list-item-avatar>
            </v-list-item>
            <v-divider></v-divider>
            <!--  -->

            <!-- Item -->
            <v-list>
                <v-list-item v-for="item in items" :key="item.title" :to="item.to">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>
            <v-list  v-if="login" >
                <v-list-item>
                        <v-btn block>Logout</v-btn>
                </v-list-item>
            </v-list>
            <!--  -->
        </v-list>

        <!-- Logout -->

        <!--  -->
    </v-navigation-drawer>

    <v-content justify="center" align="center" fill-height>
        <router-view />
    </v-content>
    <v-footer app color="#42b983" class="white--text">
        <span>CE-BoostUp Camp | 8</span>
        <v-spacer></v-spacer>
        <span>&copy; 2020</span>
    </v-footer>
</v-app>
</template>

<style lang="scss" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background: rgb(250, 250, 250);
}

.v-toolbar__title {
    font-weight: bold;
    color: #42b983;
}

#nav {
    a {
        font-weight: bold;
        color: black;
        /* remove underline */

        &.v-tab--active {
            color: #42b983;
        }
    }
}
</style>

<style>
a {
    text-decoration-line: none !important;
}
</style>

<script>
export default {
    data() {
        return {
            mini: false,
            right: true,
            items: [{
                    title: "Home",
                    icon: "mdi-home-city",
                    to: "/"
                },
                {
                    title: "My Account",
                    icon: "mdi-account",
                    to: "/"
                },
                {
                    title: "My Tasks",
                    icon: "mdi-file-document",
                    to: "/submission"
                }
            ],
            login: true
        };
    }
};
</script>

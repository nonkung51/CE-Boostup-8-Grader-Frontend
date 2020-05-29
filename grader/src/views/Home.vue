<template>
<v-container class="home">
    <v-app-bar dense color="white" app clipped-left>
        <!-- Title -->
        <v-toolbar-title class="mt-2">CE-BU 8 | Grader</v-toolbar-title>

        <!-- tabs menu -->
        <template v-slot:extension>
            <v-tabs align-with-title id="nav" slider-color="success">
                <v-tab to="/Home">Home</v-tab>
                <v-tab to="/Home/task">Tasks</v-tab>
                <v-tab to="/Home/submission">Submissions</v-tab>
            </v-tabs>
        </template>
        <!--  -->
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click.stop="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- <v-navigation-drawer v-model="right" :mini-variant.sync="mini" fixed right permanent> -->
    <v-navigation-drawer v-model="drawer" mini-variant app right permanent>
        <v-list v-if="login" dense>
            <!-- Profile -->
            <v-list-item class="px-2">

                <v-list-item-avatar style="border-radius: 0 !important;">
                    <v-badge bordered bottom color="green accent-4" dot offset-x="10" offset-y="10">
                        <v-avatar size="40">
                            <v-img @click.stop="mini = !mini" src="https://randomuser.me/api/portraits/women/75.jpg"></v-img>
                        </v-avatar>
                    </v-badge>
                </v-list-item-avatar>
            </v-list-item>
            <v-divider></v-divider>
            <!--  -->

            <!-- Item -->
            <v-list>
                <v-list-item v-for="item in items" :key="item.title" :to="item.to">
                    <v-list-item-icon>
                        <v-icon @click="{}">{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>

                    </v-list-item-content>

                </v-list-item>
            </v-list>

            <v-divider></v-divider>
            <v-list v-if="login">
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon @click.stop="mini = !mini">exit_to_app</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list>
            <!--  -->
        </v-list>

    </v-navigation-drawer>

    <v-navigation-drawer v-model="mini" app right temporary>
        <v-list v-if="login" dense>
            <!-- Profile -->
            <v-list-item class="px-2">

                <v-list-item-avatar style="border-radius: 0 !important;">
                    <v-badge bordered bottom color="green accent-4" dot offset-x="10" offset-y="10">
                        <v-avatar size="40">
                            <v-img @click.stop="mini = !mini" src="https://randomuser.me/api/portraits/women/75.jpg"></v-img>
                        </v-avatar>
                    </v-badge>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>{{user_Name}}</v-list-item-title>
                    <v-list-item-subtitle>Logged In</v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-icon @click.stop="mini = !mini">mdi-chevron-right</v-icon>
            </v-list-item>
            <v-divider></v-divider>
            <!--  -->

            <!-- Item -->
            <v-list>
                <v-list-item v-for="item in items" :key="item.title" :to="item.to">
                    <v-list-item-icon>
                        <v-icon @click="{}">{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title @click="{}">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>
            <v-list v-if="login">
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon @click="{}">exit_to_app</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-btn dark block @click="logout()">Logout</v-btn>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <!--  -->
        </v-list>

    </v-navigation-drawer>

    <router-view></router-view>
</v-container>
</template>

<script>
import mixin from '../components/mixins.vue'

// @ is an alias to /src
export default {
    name: 'Home',
    mixins: [mixin],
    components: {

    },
    data() {
        return {
            mini: false,
            right: true,
            drawer: true,
            user_Name: "",
            items: [{
                    title: "Home",
                    icon: "mdi-home-city",
                    to: "/"
                },
                {
                    title: "My Account",
                    icon: "mdi-account",
                    to: "/Home/profile"
                },
                {
                    title: "My Tasks",
                    icon: "mdi-file-document",
                    to: "/Home/submission"
                }
            ],
            login: true
        }
    },
    created() {
        var cookies = this.$cookies;
        this.user_Name = cookies.get('user');
    },
}
</script>

<style lang="scss" scoped>
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

<template>
<v-sheet class="home">
    <v-app-bar style="z-index:6 !important;" color="white" app clipped-left>
        <!-- Title -->

        <v-toolbar class="elevation-0" color="white" >
            <v-avatar :tile="true">
                <img :src="require('@/assets/logo.png')" alt="logo">
            </v-avatar>
            <v-toolbar-title class="ml-2">CE-BU 8 | Grader </v-toolbar-title>
        </v-toolbar>

        <!-- tabs menu -->
        <!-- <template v-slot:extension>
            <v-tabs align-with-title id="nav" slider-color="success">
                <v-tab to="/Home">Home</v-tab>
                <v-tab to="/Home/task">Tasks</v-tab>
                <v-tab to="/Home/submission">Submissions</v-tab>
                <v-tab href="https://stackoverflow.com/">Learn</v-tab>
                
            </v-tabs>
        </template> -->
        <!--  -->
        <v-tabs align-with-title id="nav" slider-color="success">
            <v-tab to="/Home">Home</v-tab>
            <v-tab to="/Home/task">Tasks</v-tab>
            <v-tab to="/Home/submission">Submissions</v-tab>
            <v-tab href="https://stackoverflow.com/">Learn</v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
        <v-switch v-model="$vuetify.theme.dark" color="white" hide-details></v-switch>
        <v-menu offset-y offset-x="50" transition="slide-x-transition">
            <template v-slot:activator="{ on }">
                <v-chip v-on="on" style="border-radius:50px !important;width:250px;"  class="pa-5 elevation-3" pill outlined color="black" @click="{}">
                    <v-badge bordered bottom color="green accent-4" dot offset-x="15" offset-y="10">
                        <v-avatar left>
                            <v-img @click.stop="mini = !mini" src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                        </v-avatar>
                    </v-badge>
                    {{user_Name + " Love rung Tu"}}
                </v-chip>
            </template>
            <v-card width="300">
                <v-list dark>
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>John Leider</v-list-item-title>
                            <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon @click="menu = false">
                                <v-icon>mdi-close-circle</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
                <v-list>
                    <v-list-item :ripple="false">
                        <v-list-item-action>
                            <v-icon >account_box</v-icon>
                        </v-list-item-action>
                        <v-list-item-subtitle>
                            <v-btn block dark to="/Home/profile">Profile</v-btn>
                        </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item :ripple="false">
                        <v-list-item-action>
                            <v-icon>mdi-exit-to-app</v-icon>
                        </v-list-item-action>
                        <v-list-item-subtitle>
                            <v-btn block dark @click.end="logout()">Logout</v-btn>
                        </v-list-item-subtitle>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </v-app-bar>

    <router-view>
    </router-view>

</v-sheet>
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
            login: true,
            drawerToggle: true,
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

.btn-toggle {
    flex-direction: column;
}
</style>

<style>
a {
    text-decoration-line: none !important;
}
</style>

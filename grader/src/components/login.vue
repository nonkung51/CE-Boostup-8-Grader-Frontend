<template>
<v-app id="inspire">
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card class="elevation-12">
                        <v-toolbar color="gradient blue-red" dark flat>
                            <v-toolbar-title>Login form</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn :href="source" icon large target="_blank" v-on="on">
                                        <v-icon>mdi-code-tags</v-icon>
                                    </v-btn>
                                </template>
                                <span>Source</span>
                            </v-tooltip>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field label="Login" name="login" prepend-icon="person" type="text"></v-text-field>

                                <v-text-field id="password" label="Password" name="password" prepend-icon="lock" type="password"></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <router-link to="/coding">
                                <v-btn v-on="{}" color="purple accent-4" style="text-decoration-line:none;color:white">Login</v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</v-app>
</template>

<script>
export default {
    props: {
        source: String,
    },
    methods: {},
}
</script>

<style lang="scss" scoped>
.gradient {
    &.blue-red {
        background: rgb(0, 155, 255);
        background: linear-gradient(90deg, rgba(0, 155, 255, 1) 0%, rgba(255, 0, 0, 1) 100%);
    }
}
</style>

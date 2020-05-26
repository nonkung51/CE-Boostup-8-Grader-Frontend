<template>
<div>
    <v-navigation-drawer v-model="drawerRight" app clipped right>
        <v-list dense>
            <v-list-item @click.stop="drawerRight = !drawerRight">
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </v-list-item>

            <v-list-item @click.stop="right = !right">
                <v-list-item-action>
                    <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Open Temporary Drawer</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="drawer" app>
        <v-list dense>
            <v-list-item @click.stop="drawer = !drawer">
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </v-list-item>

            <v-list-item @click.stop="left = !left">
                <v-list-item-action>
                    <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Open Temporary Drawer</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="left" fixed temporary></v-navigation-drawer>

    <v-content>
        <v-container fluid full-width>
            <v-card class="pa-5">
                <v-card class="d-flex flex-row ma-1">
                    <v-select :items="languages" v-model="value" label="Programming Language">
                        <template v-slot:prepend>
                            <v-icon>mdi-alphabetical-variant</v-icon>
                        </template>
                    </v-select>

                    <v-select :items="languages" v-model="value" label="Programming Language">
                        <template v-slot:prepend>
                            <v-icon>mdi-alphabetical-variant</v-icon>
                        </template>
                    </v-select>

                </v-card>
                <!-------------------------------  IDE ------------------------ -->
                <IDE></IDE>
            </v-card>
        </v-container>
    </v-content>

    <v-navigation-drawer v-model="right" fixed right temporary></v-navigation-drawer>

    <v-footer app color="blue-grey" class="white--text">
        <span>Vuetify</span>
        <v-spacer></v-spacer>
        <span>&copy; 2020</span>
    </v-footer>
</div>
</template>

<script>
import IDE from './IDE.vue'

export default {
    components: {
        IDE
    },
    props: {
        source: String,
    },
    data: () => ({
        drawer: null,
        drawerRight: null,
        right: false,
        left: false,
        languages: ["C/C++", "Python"],
        language: "C/C++",
    }),
}
</script>

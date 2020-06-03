<template>
<v-container fluid>
    <v-navigation-drawer no-gutters clipped app :mini-variant.sync="mini" width="50%" style="z-index:5 !important;" permanent>
        <v-row class="fill-height" no-gutters>
            <v-list v-if="!mini && side_select == 1" class="grow">
                <v-list-item @click.stop="right = !right">
                    <v-list-item-content dark>
                        <v-list-item-title>PDF of Task ID : {{ task_id }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-list v-if="!mini && side_select == 2" class="grow">
                <v-list-item @click.stop="right = !right">
                    <v-list-item-content dark>
                        <v-list-item-title> Task Detail of : {{ task_id }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-navigation-drawer dark mini-variant permanent>
                <v-list dense>
                    <v-list-item>
                        <v-icon v-if="mini" @click.stop="mini = !mini"> mdi-chevron-right</v-icon>
                        <v-icon v-else @click.stop="mini = !mini"> mdi-chevron-left</v-icon>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-icon @click="side_select = 1">mdi-file-pdf</v-icon>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-icon @click="side_select = 2">mdi-clipboard-list</v-icon>
                    </v-list-item>
                    <v-divider></v-divider>
                </v-list>
            </v-navigation-drawer>

        </v-row>
    </v-navigation-drawer>

    <IDE class="pa-5"></IDE>

</v-container>
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
        drawerRight: null,
        right: false,
        mini: true,
        side_select: 1,
        task_id: '0',
    }),
    created() {
        this.task_id = this.$route.params.task_id;
    },
}
</script>

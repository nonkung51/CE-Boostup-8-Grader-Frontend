<template>
<v-container fluid>
    <v-navigation-drawer no-gutters clipped permanent app :mini-variant.sync="mini" width="600">
        <v-row class="fill-height" no-gutters>
            <v-list v-if="!mini" class="grow">
                <v-list-item @click.stop="right = !right">
                    <v-list-item-content dark>
                        <v-list-item-title>PDF of Task ID : {{ task_id }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-navigation-drawer dark mini-variant>
                <v-list dense>
                    <v-list-item>
                        <v-icon v-if="mini" @click.stop="mini = !mini"> mdi-chevron-right</v-icon>
                        <v-icon v-else @click.stop="mini = !mini"> mdi-chevron-left</v-icon>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-icon>mdi-file-pdf</v-icon>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

        </v-row>
    </v-navigation-drawer>

    <v-list-item>
        <v-list-item-content class="pa-5">
            <IDE></IDE>
        </v-list-item-content>
    </v-list-item>

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
        task_id: '0',
    }),
    created() {
        this.task_id = this.$route.params.task_id;
    },
}
</script>

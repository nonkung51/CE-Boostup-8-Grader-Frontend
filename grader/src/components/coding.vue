<template>
<div>
    <v-navigation-drawer width="512" v-model="drawerRight" clipped :mini-variant.sync="mini" app right floating>
        <v-list dense>
            <v-list-item>
                <v-icon v-if="mini" @click.stop="mini = !mini"> mdi-chevron-left</v-icon>
                <v-icon v-else @click.stop="mini = !mini"> mdi-chevron-right</v-icon>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click.stop="right = !right">
                <v-list-item-icon>
                    <v-icon>mdi mdi-file-document</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Task PDF Here</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-content >
            <IDE></IDE>
    </v-content>

    <v-navigation-drawer v-model="right" fixed right temporary></v-navigation-drawer>

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
        drawerRight: null,
        right: false,
        mini: true,
    }),
}
</script>

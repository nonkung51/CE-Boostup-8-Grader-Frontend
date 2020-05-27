<template>
<v-container grid-list-xs>
    <v-data-iterator :items="tasks" :items-per-page.sync="itemsPerPage" hide-default-footer>
        <template v-slot:header>
            <v-toolbar class="mb-2 elevation-5" color="#42b983" rounded dark flat>
                <v-toolbar-title>All Ploblems</v-toolbar-title>
            </v-toolbar>
        </template>

        <template v-slot:default="props">
            <v-row>
                <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
                    <v-card v-ripple  class="elevation-5">
                        <v-card-title class="subheading font-weight-bold">{{ item.id }} | {{ item.name }}</v-card-title>

                        <v-divider></v-divider>
                        <v-list-item >
                            <v-list-item-content>Difficulty</v-list-item-content>
                            <v-list-item-content class="align-end">{{ item.difficulty }}</v-list-item-content>
                        </v-list-item>

                        <v-list dense>
                            <v-list-item>
                                <v-list-item-content>Passed</v-list-item-content>
                                <v-list-item-content class="align-end">{{ item.passed }}</v-list-item-content>
                            </v-list-item>
                        </v-list>

                        <v-list dense>
                            <v-list-item>
                                <v-list-item-content>Author</v-list-item-content>
                                <v-list-item-content class="align-end">{{ item.by }}</v-list-item-content>
                            </v-list-item>
                        </v-list>
                        <v-divider></v-divider>

                        <v-list dense>
                            <v-list-item>
                                <v-list-item-content>Your Work</v-list-item-content>
                                <v-list-item-content v-if="item.status" class="align-end" style="color:green;"> Passed </v-list-item-content>
                                <v-list-item-content v-else class="align-end" style="color:red;"> Undone </v-list-item-content>

                            </v-list-item>
                        </v-list>

                    </v-card>
                </v-col>
            </v-row>
        </template>

    </v-data-iterator>
</v-container>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            tasks: [{
                    name: "A+B",
                    id: "001",
                    difficulty: "0",
                    passed: "3234",
                    by: "Glairy",
                    status: true
                },
                {
                    name: "Grading",
                    id: "002",
                    difficulty: "0",
                    passed: "3192",
                    by: "Glairy",
                    status: true
                },
                {
                    name: "Min-Max",
                    id: "003",
                    difficulty: "0",
                    passed: "3143",
                    by: "Glairy",
                    status: false
                },
                {
                    name: "Matrix Addition",
                    id: "004",
                    difficulty: "0",
                    passed: "3110",
                    by: "Glairy",
                    status: false
                },
            ]
        }
    },
}
</script>

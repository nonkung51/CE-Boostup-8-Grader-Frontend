<template>
<div class="ma-12" style="background:transparent;">
    <v-card class="elevation-10" style="border-radius:20px  !important;">
        <v-data-iterator :items="filtered" :items-per-page.sync="itemsPerPage" :page="page" :search="search" :sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc" hide-default-footer>
            <!-- search bar etc. -->
           <template v-slot:header >
                <v-toolbar class="mb-2 elevation-5 task-rounded-top " style=""  color="#42b983" rounded dark flat>
                    <v-toolbar-title class="mr-5">All Questions </v-toolbar-title>
                    <v-divider vertical></v-divider>
                    <!-- Search Bar -->
                    <v-text-field v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="search" label="Search"></v-text-field>
                    <template v-if="$vuetify.breakpoint.mdAndUp">
                        <v-row justify="start" align="center">
                            <v-spacer></v-spacer>
                            <!-- Diff filter -->
                            <v-col cols="6">
                                <v-range-slider hide-details label="Difficulty" v-model="difficulty_range" thumb-color="black" thumb-label="always" min="0" max="10"></v-range-slider>
                            </v-col>
                            <v-spacer></v-spacer>

                            <!-- sort desc or asc -->
                            <v-col class="d-none d-md-flex d-xl-none d-md-none d-lg-flex">
                                <v-btn-toggle v-model="sortDesc" mandatory>
                                    <v-btn large depressed color="dark" :value="false">
                                        <v-icon>mdi-arrow-up</v-icon>
                                    </v-btn>
                                    <v-btn large depressed color="dark" :value="true">
                                        <v-icon>mdi-arrow-down</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                        </v-row>
                    </template>
                </v-toolbar>
            </template>
            <!--  -->
            <!-- table data -->
            <template v-slot:default="props">
                <v-row class="pa-5">
                    <v-col v-for="item in props.items" items-per-page="8" :key="item.name" cols="12" sm="6" md="4" lg="3">
                        <v-hover v-slot:default="{ hover }" close-delay="50">
                            <v-card class="swing-in-top-bck" v-ripple style="border-radius:20px;" :elevation="hover ? 16 : 2" :to="'/Home/coding/'+item.id">
                                <v-card-title class="subheading font-weight-bold">{{ item.id }} | {{ item.name }}</v-card-title>

                                <v-divider :color="item.status_col"></v-divider>
                                <v-list-item>
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
                                <v-divider :color="item.status_col"></v-divider>

                                <v-list dense>
                                    <v-list-item>
                                        <v-list-item-content>Your Work</v-list-item-content>
                                        <v-list-item-content class="align-end" :style="{color:item.status_col}">{{ item.status }}</v-list-item-content>
                                    </v-list-item>
                                </v-list>

                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </template>

            <!-- Pagination -->
            <template v-slot:footer>
                <v-toolbar class="mb-2 elevation-5 task-rounded-bot" color="#42b983" rounded dark flat>
                    <v-row class="ma-2" align="center" justify="center" background-color="primary">
                        <span class="bold">Items per page</span>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on }">
                                <v-btn outlined class="ml-2" v-on="on">
                                    {{ itemsPerPage }}
                                    <v-icon right>mdi-chevron-down</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="(number, index) in itemsPerPageArray" :key="index" @click="updateItemsPerPage(number)">
                                    <v-list-item-title>{{ number }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-spacer></v-spacer>
                        <span class="mr-4 bold">
                            Page {{ page }} of {{ numberOfPages }}
                        </span>
                        <v-btn fab dark color="dark darken-3" small class="mr-1" @click="formerPage">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn fab dark color="dark darken-3" small class="ml-1" @click="nextPage">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-row>
                </v-toolbar>
            </template>

            <template v-slot:no-data>
                <v-row align="center" justify="center" style="height:300px;">
                    <v-col>
                        <v-btn :ripple="false" outlined style="border-color:transparent;">Nothing Here But Tree.. <v-icon color="success" right>mdi-palm-tree</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </template>

        </v-data-iterator>
    </v-card>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            tasks: [{
                    name: "A+B",
                    id: "1",
                    difficulty: "0",
                    passed: "3234",
                    by: "Glairy",
                    status: "Passed",
                    status_col: "green", // front-end render
                },
                {
                    name: "Grading",
                    id: "2",
                    difficulty: "0",
                    passed: "3192",
                    by: "Glairy",
                    status: "Wrong",
                    status_col: "red", // front-end render
                },
                {
                    name: "Min-Max",
                    id: "3",
                    difficulty: "0",
                    passed: "3143",
                    by: "Glairy",
                    status: "Idle",
                    status_col: "grey", // front-end render
                },
                {
                    name: "Matrix Addition",
                    id: "4",
                    difficulty: "0",
                    passed: "3110",
                    by: "Glairy",
                    status: "Idle",
                    status_col: "grey", // front-end render
                },
                {
                    name: "A+B",
                    id: "1",
                    difficulty: "0",
                    passed: "3234",
                    by: "Glairy",
                    status: "Passed",
                    status_col: "green", // front-end render
                },
                {
                    name: "Grading",
                    id: "2",
                    difficulty: "0",
                    passed: "3192",
                    by: "Glairy",
                    status: "Wrong",
                    status_col: "red", // front-end render
                },
                {
                    name: "Min-Max",
                    id: "3",
                    difficulty: "1",
                    passed: "3143",
                    by: "Glairy",
                    status: "Idle",
                    status_col: "grey", // front-end render
                },
                {
                    name: "Matrix Addition",
                    id: "4",
                    difficulty: "2",
                    passed: "3110",
                    by: "Glairy",
                    status: "Idle",
                    status_col: "grey", // front-end render
                },
            ],
            sortBy: 'difficulty',
            page: 1,

            sortDesc: false,
            search: '',
            itemsPerPage: 4,
            itemsPerPageArray: [4, 8, 12],
            difficulty_range: [0, 10]
        }
    },
    computed: {
        // pagination
        numberOfPages() {
            return Math.ceil(this.tasks.length / this.itemsPerPage)
        },
        filtered() {
            return this.tasks.filter((el) => {
                var diff = el.difficulty
                return (diff >= this.difficulty_range[0] && diff <= this.difficulty_range[1]);
            });
        },
    },
    methods: {
        // pagination
        nextPage() {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage() {
            if (this.page - 1 >= 1) this.page -= 1
        },
        updateItemsPerPage(number) {
            this.itemsPerPage = number
        },
    },
}
</script>


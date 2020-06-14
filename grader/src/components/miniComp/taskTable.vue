<template>
<VueGlow :color="color" mode="hex" style="border-radius:20px  !important;width:100%" elevation="15" intense>
    <v-card style="border-radius:20px  !important;">
        <v-data-iterator :items="filtered" :items-per-page.sync="itemsPerPage" :page="page" :search="search" :sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc" hide-default-footer>
            <!-- search bar etc. -->
            <template v-slot:header>
                <v-toolbar class="mb-2 task-rounded-top " :color="color" rounded dark flat>
                    <v-toolbar-title class="headline font-weight-black mr-5">{{title}}</v-toolbar-title>
                    <v-divider vertical class="mr-5"></v-divider>
                    <!-- Search Bar -->
                    <v-col cols="4">
                        <v-text-field v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="search" label="Search"></v-text-field>
                    </v-col>
                    <template v-if="$vuetify.breakpoint.mdAndUp">
                        <v-row justify="start" align="center">
                            <v-spacer></v-spacer>
                            <!-- Diff filter -->
                            <v-col cols="6">
                                <v-range-slider hide-details label="rank" v-model="rank_range" thumb-color="black" thumb-label="always" min="0" max="10"></v-range-slider>
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
                    <v-col v-for="item in props.items" :key="item.title" cols="12" sm="6" md="4" lg="3">
                        <v-hover v-slot:default="{ hover }" close-delay="50">
                            <v-card class="swing-in-top-bck" v-ripple style="border-radius:20px;" :elevation="hover ? 16 : 2" :to="'/Home/task/'+item.id">
                                <v-card-title class="subheading font-weight-bold">{{ item.id }} | {{ item.title }}</v-card-title>

                                <v-divider :color="item.status_col"></v-divider>
                                <v-list-item>
                                    <v-list-item-content>rank</v-list-item-content>
                                    <v-list-item-content>
                                        <v-rating :value="item.rank" style="flex: none;" color="amber" dense half-increments readonly size="20"></v-rating>
                                    </v-list-item-content>
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
                <v-toolbar class="mb-2  task-rounded-bot" :color="color" rounded dark flat>
                    <v-row class="ma-2" align="center" justify="center" background-color="primary">
                        <span class="font-weight-black">Items per page</span>
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
                        <span class="mr-4 font-weight-black">
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
                        <v-btn :ripple="false" outlined style="border-color:transparent;" class="font-weight-black">Nothing Here But Tree.. <v-icon color="success" right>mdi-palm-tree</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </template>

        </v-data-iterator>
    </v-card>
</VueGlow>
</template>

<script>
import VueGlow from '../../../node_modules/vue-glow'
export default {
    name: 'taskTable',
    components: {
        VueGlow
    },
    props: {
        tasks: Array,
        color: String,
        title: String
    },
    data() {
        return {
            sortBy: 'rank',
            page: 1,
            sortDesc: false,
            search: '',
            itemsPerPage: 4,
            itemsPerPageArray: [4, 8, 12],
            rank_range: [0, 10]
        }
    },
    computed: {
        // pagination
        numberOfPages() {
            return Math.ceil(this.tasks.length / this.itemsPerPage)
        },
        filtered() {
            return this.tasks.filter((el) => {
                var diff = el.rank
                return (diff >= this.rank_range[0] && diff <= this.rank_range[1]);
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
    created() {
        // this.axios.get('http://localhost:5000/api/v1/questions').then(response => {
        //     this.tasks = response.data.data;
        // })
    }
}
</script>

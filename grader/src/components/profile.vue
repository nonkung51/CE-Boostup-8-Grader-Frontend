<template>
<v-row class="mx-auto my-12">
    <v-col align-self="start">
        <v-card class="elevation-8" max-width="374">
            <v-img height="250" class="puff-in-center" src="https://randomuser.me/api/portraits/women/75.jpg"></v-img>

            <v-card-title>Jane Smith</v-card-title>

            <v-card-text>
                <v-row align="center" class="mx-0">
                    <v-rating :value="4.5" color="amber" dense half-increments readonly size="20"></v-rating>

                    <div class="grey--text ml-4">4.5 (413)</div>
                </v-row>

                <div class="my-4 subtitle-1">
                    $ • Italian, Cafe
                </div>

                <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Tonight's availability</v-card-title>

            <v-card-text>
                <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
                    <v-chip>5:30PM</v-chip>

                    <v-chip>7:30PM</v-chip>

                    <v-chip>8:00PM</v-chip>

                    <v-chip>9:00PM</v-chip>
                </v-chip-group>
            </v-card-text>

            <v-card-actions>

            </v-card-actions>
        </v-card>
    </v-col>
    <v-col cols="10">
        <v-card full-width class="elevation-8">
            <v-img height="150" class="puff-in-center" src="https://source.unsplash.com/random">
                <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="dark lighten-5"></v-progress-circular>
                    </v-row>
                </template>
            </v-img>

            <v-tabs grow v-model="mode" class="elevation-10">
                <v-tab v-for="item in items" :key="item.tab">
                    {{ item.tab }}
                </v-tab>
            </v-tabs>

            <template>
                <!-- dash-board -->
                <v-sheet v-if="mode == 0 " class="d-flex" :class="puff[0]" color="red lighten-3" height="500">
                </v-sheet>
                <!--  -->
                <v-sheet v-if="mode == 1 " class="d-flex" :class="puff[1]" color="blue lighten-3" height="500">
                </v-sheet>
                <!-- setting -->
                <v-sheet v-if="mode == 2 " class="d-flex" :class="puff[2]" color="green lighten-3" height="500">
                </v-sheet>
            </template>

        </v-card>
    </v-col>
</v-row>
</template>

<style lang="sass" scoped>
@import '../css/animation.css'
</style>

<script>
export default {
    data: () => ({
        selection: 1,
        mode: 0,
        items: [{
                tab: 'DashBoard',
                content: 'Tab 1 Content'
            },
            {
                tab: 'Two',
                content: 'Tab 2 Content'
            },
            {
                tab: 'Setting',
                content: 'Tab 3 Content'
            },
        ],

    }),
    computed: {
        puff() {
            var arr = []
            for (var i = 0; i < this.items.length; i++) {
                arr.push(this.mode == i ? "puff-in-center" : "puff-out-center")
            }
            return arr;
        }
    },
    methods: {

    },
}
</script>

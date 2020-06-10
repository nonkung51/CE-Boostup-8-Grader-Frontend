<template>
<v-row class="mx-auto my-12" justify="space-around">
    <v-card class="elevation-8" width="20%">
        <v-img height="250" class="puff-in-center" src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>

        <v-card-title>Arthur Marcus</v-card-title>

        <v-card-text>
            <div>Some Paragraph Here</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-text>
            <div>Some Paragraph Here</div>
        </v-card-text>

        <v-card-actions>

        </v-card-actions>
    </v-card>
    <v-card width="75%" class="elevation-8">
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

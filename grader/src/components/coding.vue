<template>
<v-sheet class="ma-0" tile>
    <v-navigation-drawer ref="drawer" no-gutters clipped app :mini-variant.sync="rightNav.show" width="50%" dark class="elevation-5" :style="Zindex" permanent>
        <v-row light v-show="!rightNav.show" class="fill-height" no-gutters>
            <v-tabs grow color="#42b983" v-model="rightNav.tab_select" slider-color="#42b983" class="elevation-5">
                <v-tab>
                    <v-icon>mdi-file-pdf</v-icon>
                </v-tab>
                <v-tab>
                    <v-icon>mdi-clipboard-list</v-icon>
                </v-tab>
                <v-tab @click.stop="toggleRightNav">
                    <v-icon v-if="rightNav.show"> mdi-chevron-right</v-icon>
                    <v-icon v-else> mdi-chevron-left</v-icon>
                </v-tab>
                <v-tabs-items style="height:100%" v-model="rightNav.tab_select">
                    <v-tab-item>
                        <iframe style="width:100%;height:100%" :src="question.pdf_url"></iframe>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card tile class="pa-3 bordered-left-15-indigo">
                            <v-card-title class="display-1 mb-1" primary-title>
                                <strong> {{question.id}} | {{question.title}}</strong>
                                <v-col cols="1"></v-col>
                                <v-col cols="3">
                                    <v-row justify="space-around">
                                        <v-btn color="black" rounded outlined>{{question.details.timeLimit}}</v-btn>
                                        <v-btn color="black" rounded outlined>{{question.details.memoryLimit}}</v-btn>
                                    </v-row>
                                </v-col>
                            </v-card-title>
                            <v-card-subtitle class="pa-0">
                                <v-col cols="3" class="pa-0">
                                <strong>Author : {{question.by}}</strong>
                                </v-col>
                            </v-card-subtitle>
                        </v-card>
                        <v-sheet class="pa-5 mt-2">
                            <v-row align="center">
                                <v-col cols="4">
                                    <v-btn block outlined class="mt-1 glow-lightbrue" color="info"><strong>Question's Rank</strong></v-btn>
                                </v-col>
                                <v-col cols="4">
                                    <v-rating :value="1" color="amber" dense half-increments readonly size="20"></v-rating>
                                </v-col>
                            </v-row>
                            <v-row align="center">
                                <v-col cols="4">
                                    <v-btn block outlined class="mt-1 glow-lightbrue" color="info"><strong>Last Submit</strong></v-btn>
                                </v-col>
                                <v-col cols="4">
                                    {{question.details.list}}
                                </v-col>
                                <v-col cols="4">
                                    <v-btn outlined rounded class="glow-success" :color="question.status == 'Passed' ? 'success': 'error'">{{question.status}}</v-btn>
                                </v-col>
                            </v-row>
                        </v-sheet>
                    </v-tab-item>
                </v-tabs-items>
            </v-tabs>
        </v-row>
        <v-list style="height:100%" v-if="rightNav.show">
            <v-row style="height:100%" justify="center">
                <v-icon x-large @click.stop="toggleRightNav"> mdi-chevron-right</v-icon>
            </v-row>
        </v-list>
    </v-navigation-drawer>

    <IDE class="pa-5"></IDE>
</v-sheet>
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
        mini: false,
        question: {
            pdf_url: "https://drive.google.com/file/d/1T4caIXAj9L4qq9kBVToQzThsJZ7sbWZy/preview",
            title: "Magic Pooh",
            id: "1",
            rank: 2,
            passed: "3234",
            by: "Glairy",
            status: "Passed",
            details: {
                timeLimit: "1sec",
                memoryLimit: "64mb",
                list: "PPPPP"
            }
        },
        rightNav: {
            show: true,
            task_id: '0',
            borderSize: 5,
            tab_select: 0
        }
    }),
    computed: {
        Zindex() {
            return {
                'z-index': this.rightNav.show ? "5" : "10"
            }
        }
    },
    created() {
        this.task_id = this.$route.params.task_id;
    },
    methods: {
        setBorderWidth(width) {
            let i = this.$refs.drawer.$el.querySelector(
                ".v-navigation-drawer__border"
            );
            i.style.width = width + "px";
            i.style.background = "#1E1E1E";
            i.style.cursor = "ew-resize";
        },
        setEvents() {
            const minSize = this.rightNav.borderSize;
            const el = this.$refs.drawer.$el;
            const drawerBorder = el.querySelector(".v-navigation-drawer__border");
            const vm = this;
            const direction = el.classList.contains("v-navigation-drawer--right") ?
                "right" :
                "left";

            function resize(e) {
                document.body.style.cursor = "ew-resize";
                let f = direction === "right" ?
                    document.body.scrollWidth - e.clientX :
                    e.clientX;

                console.log(f)
                if (f >= 600)
                    el.style.width = f + "px";
            }

            drawerBorder.addEventListener(
                "mousedown",
                e => {
                    if (e.offsetX < minSize) {
                        el.style.transition = 'initial';
                        document.addEventListener("mousemove", resize, false);
                    }
                    e.preventDefault()
                },
                false
            );

            document.addEventListener(
                "click",
                () => {
                    el.style.transition = '';
                    vm.rightNav.width = el.style.width;
                    document.body.style.cursor = "";
                    document.removeEventListener("mousemove", resize, false);
                },
                false
            );
        },
        toggleRightNav() {
            this.rightNav.show = !this.rightNav.show
            if (!this.rightNav.show) {
                this.setBorderWidth(this.rightNav.borderSize)
            } else {
                this.setBorderWidth(0)
            }
            this.rightNav.tab_select = 0
        }
    },
    mounted() {
        this.setBorderWidth(0)
        this.setEvents()
    },
}
</script>

<style>
.v-navigation-drawer__content {
    overflow-y: hidden !important;
}

.v-window-item {
    height: 95% !important;
}

.glow-lightbrue {
    box-shadow: 0px 3px 1px -2px rgba(33, 150, 243, 0.2), 0px 2px 2px 0px rgba(33, 150, 243, 0.14), 0px 1px 5px 0px rgba(33, 150, 243, 0.12) !important;
}

.glow-success {
    box-shadow: 0px 3px 1px -2px rgba(76, 175, 80, 0.2), 0px 2px 2px 0px rgba(76, 175, 80, 0.14), 0px 1px 5px 0px rgba(76, 175, 80, 0.12) !important;
}
</style><style lang="scss" scoped>
$color : blue,
black,
indigo;
$size : (5:5px, 10:10px, 15:15px, 20:20px, 25:25px);

@each $col in $color {

    @each $n,
    $s in $size {
        .bordered-left-#{$n}-#{$col} {
            border-left: $s solid $col;
        }
    }
}
</style>

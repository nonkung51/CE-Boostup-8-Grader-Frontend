<template>
<v-app id="inspire">
    <v-sheet class="scaleOver" :class="scaleover" height="200" width="200" color="#42b983"></v-sheet>
    <themeSwitch style="position:absolute;right:0;top:0;z-index:4;" ></themeSwitch>
    <v-content>
        <v-container style="position:absolute;background:transparent;" fill-height fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <v-fab-transition>
                        <v-card v-show="cardShow" class="elevation-12 fab-trans">
                            <!-- header -->
                            <v-toolbar color="gradient blue-red" dark text>
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-btn icon large target="_blank">
                                    <v-icon>mdi-file-document-edit-outline</v-icon>
                                </v-btn>
                            </v-toolbar>
                            <!--  -->
                            <v-card-text>
                                <!-- error alert -->
                                <v-alert :class="shake" v-model="loginValid" dismissible color="indigo" border="left" elevation="2" colored-border icon="mdi-close-circle-outline">
                                    Oops. We encounter : <span style="color:red;">{{loginErrorMessage}} </span>
                                </v-alert>
                                <!--  -->
                                <!-- login form -->
                                <v-form ref="form" v-model="valid">
                                    <v-text-field label="Login" :rules="nameRules" counter name="login" prepend-icon="person" type="text" v-model="userFill" required></v-text-field>

                                    <v-text-field id="password" :rules="nameRules" counter label="Password" name="password" prepend-icon="lock" type="password" v-model="passFill" required></v-text-field>
                                </v-form>
                                <!--  -->
                            </v-card-text>
                            <v-divider></v-divider>
                            <!-- action button -->
                            <v-card-actions>
                                <v-btn text> <a>Contact Staff </a> </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn :loading="wait" @click.end="login()" :disabled="!valid" color="purple accent-4" style="text-decoration-line:none;color:white">Login</v-btn>
                            </v-card-actions>
                            <!--  -->
                        </v-card>
                    </v-fab-transition>
                    <!-- Login progress bar -->
                    <v-dialog v-model="wait" persistent width="300">
                        <v-card color="primary" dark>
                            <v-card-text>
                                <v-row>
                                    <v-col align-self="center">
                                        <span class="mb-2">We are Logging You in...</span>
                                        <v-divider></v-divider>
                                        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-dialog>

                </v-col>
            </v-row>
        </v-container>
        <vue-particles style="height:100%" color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="polygon" :particleSize="4" linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push"> </vue-particles>
    </v-content>
</v-app>
</template>

<style scoped>
.fab-trans {
    transition: all 1.2s ease-in-out !important;
}

.scaleOver {
    border-radius: 50%;
    position: absolute;
    top: -200px;
    right: -200px;
    z-index: 10;
}
</style>

<script>
import mixin from '../components/mixins'
import themeSwitch from '../components/miniComp/switchTheme'

export default {
    mixins: [mixin],
    components:{
        themeSwitch
    },
    props: {
        source: String,
    },
    data() {
        return {
            userFill: "",
            passFill: "",
            nameRange: [6, 20],
            nameRules: [
                v => !!v || 'This Field is required',
                v => v.length >= this.nameRange[0] || 'Must be more than 6 characters'
            ],
            // loginable 
            valid: true,
            // wait for login
            wait: false,
            // login error
            loginValid: false,
            loginErrorMessage: "UnKnow Error",
            cardShow: false,
            scaleover: ""
        }
    },
    computed: {
        shake() {
            return this.loginValid ? "shake-horizontal" : " ";
        }
    },
    methods: {
        validate() {
            this.$refs.form.validate()
        },
        async login() {
            this.wait = true
            this.loginValid = false;
            // Call login API 
            const res = await this.axios.post("http://localhost:5000/api/v1/login/", {
                "username": this.userFill,
                "password": this.passFill,
            });
            console.log(res.data);
            // Add token to Vuex

            //if (true) { // if CallBack and exist
            setTimeout(() => {
                var rand = this.getRandomInt(2);
                if (rand == 1) { // login success
                    this.scaleover = "scale-over"
                    setTimeout(() => {
                        this.$cookies.set('user', this.userFill);
                        this.$router.push('/Home')
                    }, 2000)
                } else { // error
                    this.loginValid = true;
                    this.loginErrorMessage = "No User Found "
                }
                this.wait = false
            }, 2000)
            // }
        },
        loadingClose() {
            this.wait = false
            this.loginValid = false
            this.loginErrorMessage = "UnKnow Error"
        }
    },
    mounted() {
        this.cardShow = true;
    },
    created() {
        // console.log(this.$store.state.apiToken)
        //var api = "/api/posts/1"
        // this.axios.get("http://localhost:8080/gists").then((response) => {
        //    console.log(response)
        // })
    },
}
</script>

<style lang="scss" scoped>
.gradient {
    &.blue-red {
        background: rgb(0, 155, 255);
        background: linear-gradient(90deg, rgba(0, 155, 255, 1) 0%, rgba(255, 0, 0, 1) 100%);
    }
}
</style>

<template>
<v-app id="inspire">
    <scaleOver :scaleover="scaleover"></scaleOver>
    <themeSwitch style="position:absolute;right:0;top:0;z-index:4;"></themeSwitch>
    <v-main>
        <v-container style="background:transparent;position:absolute;" fill-height fluid>
            <v-row align="center" justify="center">
                <!-- <v-fab-transition> -->
                <v-card v-show="cardShow" class=" scale-in-center elevation-12 fab-trans" width="1000" style="z-index:4">
                    <!-- header -->
                    <v-flex class="d-flex ma-0 pa-0">
                        <v-col class="ma-0 pa-0">
                            <v-sheet height="800" class="gradient t5-t2">
                            </v-sheet>
                        </v-col>
                        <v-col class="ma-0 pa-0">
                            <!--  -->
                            <v-row class="ma-0 d-flex flex-column align-center justify-center" style="height:100%">

                                <v-col class="ma-0 pa-5 d-flex flex-column align-center justify-center" cols="4" style="max-width:100%">
                                    <span class="text-h3 pa-5 font-weight-black">Sign in</span>
                                    <span class="text-h6 pa-2 font-weight-black">Login or "Try" to Register</span>
                                </v-col>
                                <!-- error alert -->
                                <v-alert :class="shake" v-model="loginValid" dismissible color="indigo" border="left" elevation="2" colored-border icon="mdi-close-circle-outline">
                                    Oops. : <span style="color:red;">{{loginErrorMessage}} </span>
                                </v-alert>
                                <!--  -->
                                <!-- login form -->
                                <v-col class="ma-0 pa-0" cols="6" style="max-width:100%">
                                    <v-form class="pa-5" ref="form" v-model="valid">
                                        <v-text-field outlined rounded label="Username" :rules="nameRules" counter name="login" prepend-inner-icon="person" type="text" v-model="userFill" required></v-text-field>
                                        <v-text-field :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" outlined rounded id="password" :rules="nameRules" counter label="Password" name="password" prepend-inner-icon="lock" :type=" !show1 ? 'text' : 'password'" v-model="passFill" @click:append="show1 = !show1" required></v-text-field>

                                        <v-btn rounded class="ma-2 pa-6 elevation-5" :class="scaleIn" v-show="loginValid" @click.end="register()" color="#42b983" style="text-decoration-line:none;color:white">Register With This User ?</v-btn>
                                        <v-btn rounded class="ma-2 pa-6 glow-success " :loading="wait" @click.end="login()" :disabled="!valid" color="#42b983" style="text-decoration-line:none;color:white">Login</v-btn>
                                    </v-form>
                                </v-col>
                            </v-row>
                            <!--  -->

                            <!-- action button -->

                            <v-footer color="warning" dark absolute>
                                <v-card-actions style="width:100%">
                                    <v-btn text :ripple="false"> Powered By Glairly </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn text :ripple="false"> Contact Staff </v-btn>
                                </v-card-actions>
                            </v-footer>
                        </v-col>
                    </v-flex>
                    <!--  -->
                </v-card>
                <!-- </v-fab-transition> -->
                <!-- Login progress bar -->
                <v-dialog v-model="wait" persistent width="500">
                    <v-card color="primary" dark>
                        <v-card-text class="pa-5 ma-0">
                            <v-row class="ma-0 pa-0" align="center" justify="center" style="height:100%">
                                <v-col>
                                    <span class="mb-2 text-h6">We are Logging You in...</span>

                                    <v-progress-linear indeterminate color="white" class="mb-0 my-2"></v-progress-linear>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-dialog>

            </v-row>
            <!-- <vue-particles style="height:100%;position:absolute;width:100%" color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="polygon" :particleSize="4" linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push"> </vue-particles> -->
        </v-container>
    </v-main>
</v-app>
</template>

<style scoped>
.fab-trans {
    transition: all 1.2s ease-in-out !important;
}
</style>

<script>
import mixin from '../components/mixins'
import themeSwitch from '../components/miniComp/switchTheme'
import scaleOver from '../components/miniComp/scaleOver'

export default {
    mixins: [mixin],
    components: {
        themeSwitch,
        scaleOver,

    },
    props: {
        source: String,
    },
    data() {
        return {
            userFill: "",
            passFill: "",
            show1: true,
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
            scaleover: "",
        }
    },
    computed: {
        shake() {
            return this.loginValid ? "shake-horizontal" : " ";
        },
        scaleIn() {
            return this.loginValid ? "scale-in-center" : " ";
        }
    },
    methods: {
        validate() {
            this.$refs.form.validate()
        },
        register() {
            this.axios.post(this.$store.state.api + '/api/v1/register/', {
                    "username": this.userFill,
                    "password": this.passFill,
                    "nickname": "anonymous"
                })
                .then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
        },
        login() {
            this.wait = true
            this.loginValid = false;

            // Call login API 
            this.axios.post(this.$store.state.api + "/api/v1/login/", {
                    "username": this.userFill,
                    "password": this.passFill,
                }).then(response => {

                    var tok = response.data.user.token
                    // login success
                    console.log(response)
                    this.axios.get('https://aws.random.cat/meow').then(res => {
                        this.loginSuccess(response, res, tok)
                    }).catch(err => {
                        console.log(err)
                    })
                })
                // login fail
                .catch(error => {
                    this.wait = false
                    this.loginValid = true;
                    this.loginErrorMessage = error.response.data.msg
                });

            // this.axios.get('https://aws.random.cat/meow').then(res => {
            //     this.loginSuccess(res)
            // }).catch(err => {
            //     console.log(err)

            // })
        },
        loginSuccess(res1, prof, token) {
            var data = {
                token: token,
                username: this.userFill,
                detail: {
                    email: res1.data.user.nickname + "@kmitl.ac.th",
                    avatar: prof.data.file,
                    name: res1.data.user.nickname
                },
                question_Done: {},
                submission: {}
            }
            this.$store.commit('user/set', data)
            this.scaleover = "scale-over"
            this.wait = false
            // animation sake
            setTimeout(() => {
                try {
                    this.$router.push('/Home/dashboard')
                } catch (e) {
                    console.log("Router Err : " + e)
                }
            }, 2000);
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

    },
}
</script>

<style lang="scss" scoped>
.gradient {
    &.blue-red {
        background: rgb(0, 155, 255);
        background: linear-gradient(90deg, rgba(0, 155, 255, 1) 0%, rgba(255, 0, 0, 1) 100%);
    }
    &.t1-t2 {
        background: var(--theme-1);
        background: linear-gradient(90deg, var(--theme-1) 0%, var(--theme-2) 100%);

    }
    &.t2-t5{
        background: var(--theme-2);
        background: linear-gradient(90deg, var(--theme-2) 0%, var(--theme-5) 100%);
    }
       &.t5-t2{
        background: var(--theme-5);
        background: linear-gradient(90deg, var(--theme-5) 0%, var(--theme-2) 100%);
    }
}
</style>

<template>
<!-- Two-way Data-Binding -->
<v-card style="border-radius: 0px;" class="pa-5">
    <v-system-bar color="transparent">
        <v-icon color="green lighten-1">mdi-checkbox-blank-circle</v-icon>

        <v-icon color="yellow">mdi-checkbox-blank-circle</v-icon>

        <v-icon color="red">mdi-checkbox-blank-circle</v-icon>
    </v-system-bar>
    <v-row>
        <!-- title -->
        <v-col align="start">
            <v-btn text style="font-weight:bold;" class="title">{{ide.title}}</v-btn>
        </v-col>
        <!-- font Size -->
        <v-col align="end">
            <v-row class="ma-0 pa-0" align="center" justify="end">
                <v-col cols="3">
                    <v-text-field class="textfield-noarrow" v-model="ide.fonts" type="number" label="Font Size" hide-details outlined min="12" max="30">
                        <template v-slot:append>
                            <v-hover>
                                <template v-slot:default="{ hover }">
                                    <v-icon :class="hover ? 'elevation-3' : '' " @click="fontDec()">mdi-minus</v-icon>
                                </template>
                            </v-hover>
                            <v-hover>
                                <template v-slot:default="{ hover }">
                                    <v-icon :class="hover ? 'elevation-3' : '' " @click="fontIns()">mdi-plus</v-icon>
                                </template>
                            </v-hover>
                        </template>
                    </v-text-field>
                </v-col>
                <!-- Language display -->
                <v-col cols="3">
                    <v-text-field style="width:200px" label="Language" class="ma-0" hide-details v-model="ide.language" outlined readonly>
                        <template v-slot:append>
                            <v-icon>mdi-alphabetical-variant</v-icon>
                        </template>
                    </v-text-field>
                </v-col>
                <!-- Theme select -->
                <v-col cols="4">
                    <v-select hide-details :items="ide.editorThemes" :menu-props="{ bottom: true, offsetY: true }" class="ma-0" v-model="cmOptions.theme" outlined label="Editor Theme">
                        <template v-slot:prepend-inner>
                            <v-icon>mdi-theme-light-dark</v-icon>
                        </template>
                    </v-select>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
    <v-divider></v-divider>
    <!-- space -->
    <v-col></v-col>
    <!-- code editor -->
    <codemirror v-model="ide.code" :style="ideStyle" :options="cmOptions" />
    <!-- action button -->
    <v-row v-if="footer" full-width justify="space-between" align="center">
        <v-col>
            <v-row class="ma-0" justify="start">
                <!-- Upload local Code -->
                <v-btn @click="$refs.inputUpload.click()" color="info" raised>
                    <v-icon left>mdi-upload</v-icon> Upload Code
                </v-btn>
                <input v-show="false" ref="inputUpload" type="file" accept=".c , .cpp" @change="codeUpload">
                <!-- Error alert -->
                <v-dialog v-model="uploadError" persistent width="500">
                    <div class="pa-5" color="transparent">
                        <v-alert class="mb-0" prominent dense :class="shake" v-model="uploadError" dismissible color="indigo" border="left" elevation="2" colored-border icon="mdi-close-circle-outline">
                            Oops. We encounter : <span style="color:red;">{{uploadError_Message}} </span>
                        </v-alert>
                    </div>
                </v-dialog>
            </v-row>
        </v-col>

        <v-col>
            <v-row class="ma-0" justify="end">
                <v-btn outlined class="mr-5">
                    <v-checkbox label="Compile With Sample" color="orange darken-1" class="ma-0" hide-details v-model="compile.withSample"></v-checkbox>
                </v-btn>
                <!-- Complie sample -->
                <v-btn color="warning" class="mr-5" raised @click.end="openCompile()">
                    <v-icon left>mdi-console</v-icon> Open Console
                </v-btn>
                <!-- Submit code -->
                <v-btn color="success" @click.end="Submit()" raised>
                    <v-icon left>mdi-cloud-upload</v-icon> Submit
                </v-btn>
                <!-- submit warning -->
                <v-snackbar v-model="snackbar">
                    {{ text }}
                    <v-btn color="pink" text @click="snackbar = false">
                        Close
                    </v-btn>
                </v-snackbar>

            </v-row>
        </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-sheet id="logs" class="text-left mt-2 elevation-3" v-show="compile.show">
        <v-card class="pa-5">
            <v-toolbar class="elevation-0">
                <v-col class="ma-0 pa-0" cols="2">
                    <v-btn block :ripple="false" class="mt-1" id="result" color="info"><strong>Result</strong></v-btn>
                </v-col>
                <v-row align="center" justify="end">
                    <v-col cols="3">
                        <v-btn v-if="compile.time" block outlined class="mt-1" id="result" color="info">Time Used : <strong>{{ compile.time + " s."}}</strong></v-btn>
                    </v-col>
                    <v-col cols="3">
                        <v-btn block class="mt-1" id="result" color="indigo" dark @click.end="Compiling()">
                            <v-icon left>mdi-code-tags-check</v-icon> <strong>Compiling</strong>
                        </v-btn>
                    </v-col>
                </v-row>

            </v-toolbar>

            <span v-if="compile.withSample">
                <v-skeleton-loader :loading="compile.skeleton" height="100%" type="table">
                    <v-tabs show-arrows grow v-model="compile.tabSelect" slider-color="primary">
                        <template v-if="compile.withSample">
                            <v-tab v-for="(i,index) in compile.compile_Status.length" :key="index">
                                <v-btn text :ripple="false">
                                    Case : {{index + 1}}
                                    <v-icon v-if="compile.compile_Status[index] == 'P'" color="success" right>mdi-check-bold</v-icon>
                                    <v-icon v-else color="error" right>mdi-close</v-icon>
                                </v-btn>
                            </v-tab>
                        </template>
                        <!-- <v-tabs-items v-model="compile.tabSelect">
                            <v-tab-item v-for="(i,index) in compile.compile_Status.length" :key="index">
                                <v-textarea class="mt-2 elevation-2" label="Error Logs" readonly style="color:green;" color="success" outlined hide-details v-model="compile.errorText[index]">
                                </v-textarea>
                            </v-tab-item>
                        </v-tabs-items> -->
                    </v-tabs>
                </v-skeleton-loader>
            </span>
            <span v-else>
                <v-textarea class="mt-2 elevation-2" clearable label="Input Field" style="color:green;" rows="4" color="success" outlined hide-details v-model="compile.input">
                </v-textarea>
                <v-textarea v-if="compile.log" class="mt-2 elevation-2" label="Compile Result" readonly style="color:green;" color="success" outlined hide-details v-model="compile.log">
                </v-textarea>
            </span>

        </v-card>
    </v-sheet>
</v-card>
</template>

<script>
// import language js
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/clike/clike.js'

// import theme style
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'

import mixin from '../components/mixins'

export default {
    mixins: [mixin],
    props: {
        qId: String,
        footer: Boolean,
        code: String,
        title: String,
        task: null
    },
    components: {},
    data() {
        return {
            cmOptions: {
                tabSize: 6,
                mode: 'text/x-c++src',
                theme: 'base16-dark',
                lineNumbers: true,
                line: true,
                indentUnit: 0
                // more CodeMirror options...
            },
            ide: {
                title: "",
                fonts: 16,
                language: "C/C++",
                editorThemes: ["base16-dark", "base16-light"],
                code: "#include<stdio.h> \r\n\nint main() { \r\n printf(\"Hello!! CE-BoostUp 8\"); \r\n return 0; \r\n}",
            },
            //  snackbar //
            snackbar: false,
            text: 'Submit Success',
            ///////////////
            // read file //
            uploadError: null,
            uploadError_Message: "",
            ///////////////
            // compile //
            compile: {
                withSample: false,
                show: false,
                // no sample
                input: "Your Input Here",
                log: "",
                time: "",
                // with sample
                compile_Status: [],
                tabSelect: 0,
                skeleton: false
            } // length depend on question's sample
        }
    },
    computed: {
        shake() {
            return this.uploadError ? "shake-horizontal" : " ";
        },
        Compile() {
            var arr = []
            for (var i = 0; i < this.compile.compile_Status.length; i++) {
                arr.push(this.compile.compile_Status[i] ? false : true)
            }
            return arr;
        },
        ideStyle() {
            return {
                'font-size': this.ide.fonts + 'px',
            }
        },
    },
    methods: {
        codeUpload(e) {
            // define what is needed
            const errorCase = ["Invalid file type.", "Could not read file.", "Could not reach file !?", "Unknown Error"]
            const allow_type = ['c', 'cpp']

            // get and read file
            this.uploadError = false
            const files = e.target.files
            if (files) {
                const file = files[0]
                if (file) {
                    const files_ = file.name.split('.')
                    const files_type = files_[files_.length - 1]
                    if (allow_type.includes(files_type)) {
                        var tmp = this.ide.code
                        this.readTextFile(file)
                        var response = this.ide.code
                        if (response) {
                            this.ide.code = response
                        } else {
                            this.ide.code = tmp
                            this.uploadError = true
                            this.uploadError_Message = errorCase[1]
                        }
                    } else {
                        this.uploadError = true
                        this.uploadError_Message = errorCase[0]
                    }
                }
            } else {
                this.uploadError = true
                this.uploadError_Message = errorCase[2]
            }
        },
        readTextFile(file) {
            var reader = new FileReader();
            reader.onload = () => {
                var contents = reader.result;
                this.ide.code = contents
            }
            reader.readAsText(file);
        },
        delay(i) {
            setTimeout(() => {
                this.compile.compile_Status[i].state = true
            }, this.getRandomInt(5000));
        },
        openCompile() {
            this.compile.show = !this.compile.show
            setTimeout(() => {
                var logs = document.getElementById('logs')
                logs.scrollIntoView();
            }, 200);
            this.compile.compile_Status = []
            this.compile.log = ""
        },
        Compiling() {

            // no sample
            let data = {
                input: "",
                sourceCode: ""
            }
            this.compile.log = "Waiting for response"

            if (this.compile.withSample) {
                // input
                data.input = this.task.input
                // output
                data.output = this.task.output
                // code
                data.sourceCode = this.ide.code
            } else { // without sample
                if (!this.compile.input) this.compile.input = " "
                data = {
                    input: this.compile.input,
                    sourceCode: this.ide.code
                }
            }
            data = JSON.stringify(data)

            this.axios.post(this.$store.state.compiler+'/compiler', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res)
                if (this.compile.withSample) {
                    this.compile.compile_Status = []
                    for (var i = 0; i < res.data.result.length; i++) {
                        this.compile.compile_Status.push(res.data.result.charAt(i))
                    }
                    this.compile.time = res.data.timeUsage
                } else {
                    // var standAlone = ["C" , "B" , "L" , "F"]
                    this.compile.log = res.data.result;
                    this.compile.time = res.data.timeUsage

                }
            }).catch(err => {
                console.log(err)
            })

        },
        Submit() {
            let data = {
                token: this.$store.getters['user/getToken'],
                code: this.ide.code,
                questionId: this.task.id
            }
            this.axios.post(this.$store.state.api+'/api/v1/submission/', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                this.snackbar = true
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },
        fontIns() {
            this.ide.fonts += this.ide.fonts < 30 ? 1 : 0;
        },
        fontDec() {
            this.ide.fonts -= this.ide.fonts > 10 ? 1 : 0;
        }
    },
    mounted() {
        if (this.code) {
            this.ide.code = this.code
        }
        if (!this.title) {
            this.ide.title = "Write Your Code Below.."
        }
    },
    created() {},
}
</script>

<style lang="scss" scoped>
@import '../css/animation.css';
</style><style>
.CodeMirror {
    min-height: 500px;
    min-width: 500px;
}

.CodeMirror-scroll {
    text-align: left !important;
}

.textfield-noarrow input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.textfield-noarrow input[type=number] {
    -moz-appearance: textfield;
}
</style>

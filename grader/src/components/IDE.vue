<template>
<!-- Two-way Data-Binding -->
<v-card style="border-radius: 0px;" class="pa-5">
    <v-system-bar color="transparent">
        <v-icon color="green lighten-1">mdi-checkbox-blank-circle</v-icon>

        <v-icon color="yellow">mdi-checkbox-blank-circle</v-icon>

        <v-icon color="red">mdi-checkbox-blank-circle</v-icon>
    </v-system-bar>
    <v-row>
        <v-col align="start">
            <v-btn text style="font-weight:bold;" class="title">Write Your Code Below..</v-btn>
        </v-col>
        <!-- font Size -->
        <v-col cols="2">
            <v-text-field v-model="ide.fonts" type="number" label="Font Size" hide-details outlined append-icon="mdi-format-size">
            </v-text-field>
        </v-col>
        <!-- Language display -->
        <v-col cols="2">
            <v-text-field label="Editor Language" class="ma-0" hide-details v-model="ide.language" outlined readonly>
                <template v-slot:append>
                    <v-icon>mdi-alphabetical-variant</v-icon>
                </template>
            </v-text-field>
        </v-col>
        <!-- Theme select -->
        <v-col cols="2">
            <v-select hide-details :items="ide.editorThemes" class="ma-0" v-model="cmOptions.theme" outlined label="Editor Theme">
                <template v-slot:prepend-inner>
                    <v-icon>mdi-theme-light-dark</v-icon>
                </template>
            </v-select>
        </v-col>
    </v-row>
    <v-divider></v-divider>
    <!-- space -->
    <v-col></v-col>
    <!-- code editor -->
    <codemirror v-model="ide.code" :style="ideStyle" :options="cmOptions" />
    <!-- action button -->
    <v-row full-width justify="space-between" align="center">
        <v-col>
            <v-row class="ma-0" justify="start">
                <!-- Upload local Code -->
                <v-btn @click="$refs.inputUpload.click()" color="info" raised>
                    <v-icon left>mdi-upload</v-icon> Upload Code
                </v-btn>
                <input v-show="false" ref="inputUpload" type="file" @change="codeUpload">
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
                <v-btn color="warning" class="mr-5" raised @click.end="Compiling()">
                    <v-icon left>mdi-code-tags-check</v-icon> Compile
                </v-btn>
                <!-- Submit code -->
                <v-btn @click="snackbar = true" color="success" raised>
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
    <v-sheet class="text-left mt-2 elevation-3" v-show="compile.show">
        <v-card class="pa-5" height="300">
            <v-skeleton-loader :loading="compile.skeleton" height="100%" type="table">

                <v-toolbar class="elevation-0">
                    <v-col cols="2">
                        <v-btn block outlined class="mt-1" id="result" color="info"><strong>Result</strong></v-btn>
                    </v-col>
                </v-toolbar>

                <v-tabs show-arrows grow v-model="compile.tabSelect" slider-color="primary">
                    <template v-if="compile.withSample">
                        <v-tab  v-for="(i,index) in compile.compile_Status.length" :key="index">
                            <v-btn text  :ripple="false" :loading="!compile.compile_Status[index].state">
                                Case : {{index + 1}}
                                <v-icon v-if="compile.compile_Status[index].result" color="success" right>mdi-check-bold</v-icon>
                                <v-icon v-else color="error" right>mdi-close</v-icon>
                            </v-btn>
                        </v-tab>
                    </template>
                    <v-tabs-items v-model="compile.tabSelect">
                        <v-tab-item v-for="(i,index) in compile.compile_Status.length" :key="index">
                            <v-textarea height="100%" class="mt-2 elevation-2" label="Error Logs" readonly style="color:green;" color="success" outlined hide-details auto-grow v-model="compile.errorText[index]">
                            </v-textarea>
                        </v-tab-item>
                    </v-tabs-items>
                </v-tabs>
            </v-skeleton-loader>
        </v-card>
    </v-sheet>
</v-card>

<!-- Or manually control the data synchronization -->
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
    components: {

    },
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
                fonts: 16,
                language: "C/C++",
                editorThemes: ["base16-dark", "base16-light"],
                code: 'const a = 10',
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
                compile_Status: [{
                        state: false,
                        result: "idle"
                    },
                    {
                        state: false,
                        result: "idle"
                    },
                    {
                        state: false,
                        result: "idle"
                    },
                    {
                        state: false,
                        result: "idle"
                    },
                    {
                        state: false,
                        result: "idle"
                    }
                ],
                errorText: ["Error Sample 1\nError #1\nError#2", "Error Sample 2\nError #1\nError#2", "Error Sample 3\nError #1\nError#2", "Error Sample 4\nError #1\nError#2", "Error Sample 5\nError #1\nError#2"],
                tabSelect: 0,
                skeleton: true
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
        }
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
                    console.log(file)
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
        Compiling() {
            // call bottom sheet
            this.compile.show = true

            this.compile.compile_Status = [{
                    state: false,
                    result: "idle"
                },
                {
                    state: false,
                    result: "idle"
                },
                {
                    state: false,
                    result: "idle"
                },
                {
                    state: false,
                    result: "idle"
                },
                {
                    state: false,
                    result: "idle"
                }
            ]

            // wait for response  3 sec
            // call api here 
            // this.axios.post('url to submit',{body} , {timeout : 3 }).then(res => {})

            // simulator
            setTimeout(() => {
                this.compile.skeleton = false
            }, 2000)

            for (var i = 0; i < this.compile.compile_Status.length; i++) {
                var res = this.getRandomInt(3)
                switch (res) {
                    case 0:
                        this.compile.compile_Status[i].result = false
                        break
                    case 1:
                        this.compile.compile_Status[i].result = true
                        break
                    case 2:
                        this.compile.compile_Status[i].result = true
                        break
                }
                this.delay(i);
            }

        },
        increment() {
            this.foo = parseInt(this.foo, 10) + 1
        },
        decrement() {
            this.foo = parseInt(this.foo, 10) - 1
        }
    },
    mounted() {}
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
</style>

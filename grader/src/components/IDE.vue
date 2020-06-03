<template>
<!-- Two-way Data-Binding -->
<v-card style="border-radius: 10px;" class="mt-2 pa-5 elevation-5">
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
            <v-text-field v-model="fonts" type="number" label="Font Size" hide-details outlined append-icon="mdi-format-size">
            </v-text-field>
        </v-col>
        <!-- Language display -->
        <v-col cols="2">
            <v-text-field label="Editor Language" class="ma-0" hide-details v-model="language" outlined readonly>
                <template v-slot:append>
                    <v-icon>mdi-alphabetical-variant</v-icon>
                </template>
            </v-text-field>
        </v-col>
        <!-- Theme select -->
        <v-col cols="2">
            <v-select hide-details :items="editorThemes" class="ma-0" v-model="theme" outlined label="Editor Theme">
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
    <codemirror v-model="code" :style="fontSize" :options="cmOptions" />
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

                <!-- compile test -->
                <v-bottom-sheet v-model="compile">
                    <v-sheet class="text-center">
                        <v-col>
                            <v-btn class="mt-1" text color="red" @click="compile = !compile">close</v-btn>
                        </v-col>
                        <v-card class="pa-5">
                            <v-row>
                                <v-col cols="2">
                                    <v-btn block fill-height outlined class="mt-1" text color="info"><strong>Result</strong></v-btn>
                                </v-col>
                                <v-col>
                                    <v-row vertical align="center" justify="start">
                                        <v-btn text v-for="(i,index) in compile_Status.length" :key="index" :loading="!compile_Status[index].state">
                                            <v-icon v-if="compile_Status[index].result" color="success">mdi-check-bold</v-icon>
                                            <v-icon v-else color="error">mdi-close</v-icon>
                                        </v-btn>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-sheet>
                </v-bottom-sheet>
            </v-row>
        </v-col>

    </v-row>
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
            code: 'const a = 10',
            cmOptions: {
                tabSize: 6,
                mode: 'text/x-c++src',
                theme: 'base16-dark',
                lineNumbers: true,
                line: true,
                // more CodeMirror options...
            },
            fonts: 16,
            language: "C/C++",
            editorThemes: ["base16-dark", "base16-light"],
            theme: "base16-dark",
            //  snackbar //
            snackbar: false,
            text: 'Submit Success',
            ///////////////
            // read file //
            uploadError: null,
            uploadError_Message: "",
            ///////////////
            // compile //
            compile: false,
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
            ], // length depend on question's sample
        }
    },
    watch: {
        theme() {
            this.cmOptions.theme = this.theme;

        },
    },
    computed: {
        shake() {
            return this.uploadError ? "shake-horizontal" : " ";
        },
        Compile() {
            var arr = []
            for (var i = 0; i < this.compile_Status.length; i++) {
                arr.push(this.compile_Status[i] ? false : true)
            }
            return arr;
        },
        fontSize() {
            return {
                fontSize: this.fonts + 'px',
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
                        var tmp = this.code
                        this.readTextFile(file)
                        var response = this.code
                        if (response) {
                            this.code = response
                        } else {
                            this.code = tmp
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
                var contents = reader.result; //.replace("\r\n","<br/>");
                this.code = contents
            }
            reader.readAsText(file);
            // not work ????
            // var rawFile = new XMLHttpRequest();
            // rawFile.open("GET", file, false);
            // var allText
            // rawFile.onreadystatechange = function () {
            //     if (rawFile.readyState === 4) {
            //         if (rawFile.status === 200 || rawFile.status == 0) {
            //             allText = rawFile.responseText;
            //         } else allText =null
            //     } else allText = null
            // }
            // rawFile.send(null);
            // return allText
        },
        delay(i) {
            setTimeout(() => {
                this.compile_Status[i].state = true
            }, 1000);
        },
        Compiling() {
            // call bottom sheet
            this.compile = true

            this.compile_Status = [{
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
            for (var i = 0; i < this.compile_Status.length; i++) {
                var res = this.getRandomInt(3)
                switch (res) {
                    case 0:
                        this.compile_Status[i].result = false
                        break
                    case 1:
                        this.compile_Status[i].result = true
                        break
                    case 2:
                        this.compile_Status[i].result = true
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

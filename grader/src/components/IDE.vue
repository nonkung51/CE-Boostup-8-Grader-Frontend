<template>
<!-- Two-way Data-Binding -->
<v-card style="border-radius: 1vw;" class="pa-5">
    <v-card style="border-radius: 50px;" class="elevation-5" id="editor-panel">
        <v-row align="center" justify="center">
            <v-col cols="4">
                <v-text-field label="Editor Language" class="ma-0" hide-details v-model="language" outlined readonly>
                    <template v-slot:append>
                        <v-icon>mdi-alphabetical-variant</v-icon>
                    </template>
                </v-text-field>
            </v-col>
            <v-col cols="4">
                <v-select hide-details :items="editorThemes" class="ma-0" v-model="theme" outlined label="Editor Theme">
                    <template v-slot:prepend-inner>
                        <v-icon>mdi-theme-light-dark</v-icon>
                    </template>
                </v-select>
            </v-col>
        </v-row>
    </v-card>
    <v-card style="border-radius: 10px;" class="mt-2 pa-5 elevation-5">
        <!-------------------------------  IDE ------------------------ -->
        <codemirror v-model="code" :options="cmOptions" />
        <v-row full-width justify="space-between">

            <v-col align="start">
                <v-btn color="info" raised>
                    <v-icon left>mdi-upload</v-icon> Upload Code
                </v-btn>
            </v-col>

            <v-col align="end" >
                <v-btn color="success" raised>
                    <v-icon left>mdi-code-tags-check</v-icon> Compile
                </v-btn>
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

            </v-col>

        </v-row>
    </v-card>
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

// import more 'codemirror/some-resource...'

export default {
    components: {

    },
    data() {
        return {
            code: 'const a = 10',
            cmOptions: {
                tabSize: 4,
                mode: 'text/x-c++src',
                theme: 'base16-dark',
                lineNumbers: true,
                line: true,
                // more CodeMirror options...
            },
            language: "C/C++",
            editorThemes: ["base16-dark", "base16-light"],
            theme: "base16-dark",
            //  snackbar //
            snackbar: false,
            text: 'Submit Success',
            //          //

        }
    },
    watch: {
        theme() {
            this.cmOptions.theme = this.theme;

        },
    },
    methods: {
        onCmReady(cm) {
            console.log('the editor is readied!', cm)
        },
        onCmFocus(cm) {
            console.log('the editor is focused!', cm)
        },
        onCmCodeChange(newCode) {
            console.log('this is new code', newCode)
            this.code = newCode
        }
    },
    computed: {
        codemirror() {
            return this.$refs.cmEditor.codemirror
        }
    },
    mounted() {
        console.log('the current CodeMirror instance object:', this.codemirror)
        // you can use this.codemirror to do something...
    }
}
</script>

<style>
#editor-panel>div {}

.CodeMirror-scroll {
    text-align: left !important;
}
</style>

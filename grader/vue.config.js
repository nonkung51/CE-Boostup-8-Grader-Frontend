module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    // dev mode
    devServer: {
        proxy: 'http://localhost:8080'
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'CE-BU | 8'
                return args
            })
    }
}
module.exports = {
    "transpileDependencies": [
        "vuetify", "vuex-persist"
    ],
    // dev mode
    devServer: {
        proxy: {
            "/api": {
                target: 'http://jsonplaceholder.typicode.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                },
                secure: false
            },
            "/gists": {
                target: "https://api.github.com",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/gists': ''
                },

            },
            "/goo": {
                target: "https://www.google.co.th/",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/goo': ''
                },
            },
        }
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'CE-BoostUp 8'
                return args
            })
    }
}
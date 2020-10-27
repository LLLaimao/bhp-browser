module.exports = {
    publicPath: '', 
    lintOnSave: true,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue : 16, 
                        selectorBlackList  : [],
                        propList   : ['*'],
                    }),
                ]
            }
        }
    },
}

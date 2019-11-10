// const autoprefixer = require("autoprefixer");
const pxtorem = require('postcss-pxtorem');

module.exports = {
    publicPath: './',
    devServer: {
        disableHostCheck: true
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    // autoprefixer(),
                    pxtorem({
                        rootValue: 32,
                        propList: ['*'],
                        // 该项仅在使用 Circle 组件时需要
                        // 原因参见 https://github.com/youzan/vant/issues/1948
                        selectorBlackList: ['van']
                    })
                ]
            }
        }
    }
};

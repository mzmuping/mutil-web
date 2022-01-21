const path = require('path');
module.exports = ({ webpackLoaderContext }) => {

    const designWidth = webpackLoaderContext.resourcePath.includes(path.join('node_modules', 'vant')) ? 375 : 750;//兼容vant
    return {
        plugins: [
            'postcss-preset-env',
            'autoprefixer', // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
            ["postcss-px-to-viewport", {
                unitToConvert: "px", // 要转化的单位
                viewportWidth: designWidth, // UI设计稿的宽度
                viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
                unitPrecision: 3, // 转换后的精度，即小数点位数
                propList: ["*", "!letter-spacing"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换,除了letter-spacing的
                viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
                fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
                selectorBlackList: ["wrap"], // 指定不转换为视窗单位的类名，
                minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
                mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
                replace: true, // 是否转换后直接更换属性值
                exclude: [/node_modules/, /pc/], // 设置忽略文件，用正则做目录名匹配
                include: [/mobile/],
                landscape: false // 是否处理横屏情况
            }
            ]
        ]
    }
}

// module.exports = (webpack) => {
//     return {
//         plugins: {
//             autoprefixer: {}, // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
//             "postcss-px-to-viewport": {
//                 unitToConvert: "px", // 要转化的单位
//                 viewportWidth: 750, // UI设计稿的宽度
//                 viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
//                 unitPrecision: 3, // 转换后的精度，即小数点位数
//                 propList: ["*", "!letter-spacing"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换,除了letter-spacing的
//                 viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
//                 fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
//                 selectorBlackList: ["wrap"], // 指定不转换为视窗单位的类名，
//                 minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
//                 mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
//                 replace: true, // 是否转换后直接更换属性值
//                 exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
//                 include: [/mobile/],
//                 landscape: false // 是否处理横屏情况
//             }
//         }
//     }
// };
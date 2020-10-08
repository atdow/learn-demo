const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const isLib = process.env.VUE_APP_BUILD_MODE === 'lib';
const resolve = dir => path.join(__dirname, dir);

const setChainWebpack = config => {
    // 将@设置为app
    config.resolve.alias.set('@', path.resolve('app'));
    //将本地开发@sinokit设置为读取本地的packages，发布以后也会统一
    config.resolve.alias.set('@sinokit', path.resolve('packages'));
    config.module
        .rule('js')
        .include.add('/app')
        .end()
        .use('babel')
        .loader('babel-loader');

    if (isProd) {
        config.performance
            .set('maxEntrypointSize', 2500000)
            .set('maxAssetSize', 2000000);
        // drop console
        config.optimization.minimizer('terser').tap(args => {
            args[0].terserOptions.compress.drop_console = true;
            return args;
        });
    }
};

const setConfigureWebpack = config => {
    if (isLib) {
        const externalLibs = ['vue'];
        // 将 vue 设置为外部依赖
        let externals = [
            function (context, request, callback) {
                for (const lib of externalLibs) {
                    const reg = new RegExp(`^${lib}`);
                    if (reg.test(request)) {
                        return callback(null, lib);
                    }
                }
                callback();
            }
        ];
        config.externals = externals;
        config.output = {
            ...config.output,
            library: 'SinoKit',
            libraryExport: 'default'
        };
    }
};

module.exports = {
    publicPath: '/',
    pages: {
        index: {
            entry: resolve('app/main.js') // 将入口地址修改了
        }
    },
    lintOnSave: true,
    productionSourceMap: false,
    chainWebpack: config => setChainWebpack(config),
    configureWebpack: config => setConfigureWebpack(config),
    css: {
        extract: false
    },
    devServer: {
        port: 666,
        open: false,
        overlay: {
            warnings: true,
            errors: true
        }
    }
};
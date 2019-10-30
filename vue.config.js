/**
 * Created by WL on 2018/11/6.
 * Description vue配置
 */
const path = require('path');
const debug = process.env.NODE_ENV !== 'production';

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 基本路径
  baseUrl: './',
  // 输入文件目录
  outputDir: 'dist',
  // 放置生成的静态资源(js,css,font,img)的(相对于outputDir的)目录
  assetsDir: 'assets',
  //  指定生成的'index.html'的输出路径(相对于outputDir).也可以指定一个绝对路径
  indexPath: 'index.html',
  // 默认情况下生成的静态文件包含hash以便控制缓存.false关闭文件名哈希
  filenameHashing: true,
  // 是否开启eslint-loader保存检测,有效值 true|false|error
  lintOnSave: true,
  // 运行时版本是否需要编译，如果需要会让你的应用额外增加10kb左右
  runtimeCompiler: false,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],
  // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  productionSourceMap: false,
  // webpack配置， 值为对象时合并到最终配置中，为方法时改写配置
  configureWebpack: config => {
    if (debug) { // 开发环境配置
      config.devtool = 'cheap-module-eval-source-map';
    } else { // 生产环境配置
    }
    Object.assign(config, {//开发生产共同配置
      resolve: {
        extensions: ['.js', '.vue', '.json', ".css"],
        alias: {
          '@': resolve('./src'),
          '@c': resolve('./src/components'),
          '@v': resolve('./src/views'),
          '@u': resolve('./src/until'),
          '@api': resolve('./src/api'),
          'vue$': 'vue/dist/vue.esm.js'
        }
      }
    });
  },
  // webpack链接API，用于生产和修改webpack配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    // config.module.rule('js').include.add(/node_modules\/(dom7|swiper)\/.*/);
    if (debug) {
      // 本地开发配置
    } else {
      // 生产开发配置
    }
  },
  // 配置高于chainWebpack中关于css loader的配置
  css: {
    // modules: true, //是否开启支出'foo.module.css'样式
    extract: true, // 是否使用css分离插件 ExtractTextPlugin,采用独立样式文件载入，不采用<style>方式内联至html文件中
    sourceMap: false, // 是否在构建样式地图，false将提高构建速度
    loaderOptions: { // css预编译器配置项
      css: {// 这里的选项会传递给 css-loader
        localIdentName: '[name]-[hash]',
        camelCase: 'only'
      },
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `@import "@/styles/index.scss";`
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      },
    }
  },
  // 构建时开启多线程处理babel编译
  parallel: require('os').cpus().length > 1,
  // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // 第三方插件配置
  pluginOptions: {},
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: '8080',
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过  vue.config.js 中的 devServer.proxy 选项来配置。
    proxy: {
      'api': {
        target: '<url>',
        ws: true,
        changOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    },
    before: app => {
    }
  }
};

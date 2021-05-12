const path = require('path')
const { merge } = require('webpack-merge')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  entry: [
    path.resolve(__dirname, '../../src/main.js'),
    path.resolve(__dirname, '../../node_modules/shopify-theme-lab-reloader/client.autoload') // add reloader to the bundle
  ],
  devtool: 'source-map',
  module: {
    rules: [
{
  test: /\.(scss)$/,
  use: [{
    // inject CSS to page
    loader: 'style-loader'
  }, {
    // translates CSS into CommonJS modules
    loader: 'css-loader',
               options: {
              sourceMap: true,

            },
  }, {
    // Run postcss actions
    loader: 'postcss-loader',
    options: {
      // `postcssOptions` is needed for postcss 8.x;
      // if you use postcss 7.x skip the key
      postcssOptions: {
        // postcss plugins, can be exported to postcss.config.js
        plugins: function () {
          return [
            require('autoprefixer')
          ];
        }
      }
    }
  }, {
    // compiles Sass to CSS
    loader: 'sass-loader',
                options: {
              sourceMap: true,
                sassOptions: {
                  outputStyle: "compressed",
              },
            },
  }]
}
    ],
  },
  plugins: [
    /**
     * docs: https://www.npmjs.com/package/eslint-webpack-plugin
     */
    new ESLintPlugin({
      files: 'src/**/*.{js,vue}',
      overrideConfigFile: path.resolve(__dirname, '../.eslintrc.js')
    }),
    /**
     * docs: https://www.npmjs.com/package/stylelint-webpack-plugin
     */
    new StylelintPlugin({
      files: 'src/**/*.{vue,css,sass,scss}',
      configFile: path.resolve(__dirname, '../.stylelintrc.js')
    })
  ]
})
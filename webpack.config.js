const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const faviconData = require('./src/faviconData.json')

module.exports = (env) =>
{
  const title = 'BlastGame'
  const ogimageUrl = 'assets/img/app/og-image.png'
  const faviconHeadHtml = faviconData ? faviconData.favicon.html_code : ''

  return {
    mode: env.NODE_ENV,
    entry: './src/index.js',
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/bundle.js',
      clean: {
        keep(asset)
        {
          return !asset.includes('index.html')
            || !asset.includes('assets/')
            || !asset.includes('js/')
        },
      },
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 3000,
    },

    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
          },
        }),
      ],
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },

    plugins: [
      new webpack.ProgressPlugin(),

      new CopyWebpackPlugin({
        patterns: [
          { from: './src/assets', to: './assets' },
        ],
      }),

      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title,
        description: 'Awesome game!',
        inject: true,

        meta: {
          'charset': { charset: 'utf-8' },
          'viewport': { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
          'content-type': { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
          'x-ua-compatible': { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
          'title': { name: 'title', contnet: title },
          'description': { name: 'description', contnet: '' },
          'keyword': { name: 'keywords', content: '' },
          'og:title': { property: 'og:title', content: title },
          'og:description': { property: 'og:description', content: '' },
          'og:type': { property: 'og:type', content: 'application' },
          'og:url': { property: 'og:url', content: '' },
          'og:image': { property: 'og:image', content: ogimageUrl },
          'twitter:card': { name: 'twitter:card', content: ogimageUrl },
          'twitter:title': { name: 'twitter:title', content: title },
          'twitter:description': { name: 'twitter:description', content: '' },
          'twitter:image': { name: 'twitter:image', content: ogimageUrl },
        },
        templateContent: `
          <!doctype html>
          <html>
            <head>
              ${faviconHeadHtml}
            </head>
            <body>
              <div id="game"></div>
            </body>
          </html>        
        `,
      }),
    ],
  }
}

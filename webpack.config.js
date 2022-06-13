const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const faviconData = require('./src/faviconData.json')

module.exports = (env) =>
{
	const title = 'BlastGame'
	const description = 'Awesome game!'
	const ogimageUrl = 'assets/img/app/og-image.png'
	const faviconHeadHtml = faviconData ? faviconData.favicon.html_code : ''

	return {
		mode: env.NODE_ENV,
		entry: {
			app: './src/index.js',
		},
		devtool: 'inline-source-map',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'js/bundle.js',
			clean: {
				keep(asset)
				{
					return !asset.includes('index.html')
						&& !asset.includes('assets/')
						&& !asset.includes('js/')
						&& !asset.includes('css/')
				},
			},
		},
		devServer: {
			static: {
				directory: path.join(__dirname, 'dist'),
			},
			port: 3000,
		},

    resolve: {
      extensions: ['.js', '.styl', '.png', '.mp3'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
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
					use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            },
          ],
				},
        {
          test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[hash][ext]'
          },
        },
				{
					test: /\.styl$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						{
							loader: 'css-loader',
						},
						{
							loader: 'stylus-loader',
						},
					],
				},
        {
          test: /\.(png|jpg|svg|gif|json)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/img/[hash][ext]'
          },
        },
        {
          test: /\.(mp3|wav)$/,
          loader: 'file-loader',
          options: {
            outputPath: 'assets/sounds',
          },
        },
			],
		},

		plugins: [
			new webpack.ProgressPlugin(),

      new MiniCssExtractPlugin({
        filename: 'css/build.css',
      }),

			new HtmlWebpackPlugin({
				template: 'src/index.html',
				title,
				description,
				inject: true,

				meta: {
					'charset': { charset: 'utf-8' },
					'viewport': { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
					'content-type': { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
					'x-ua-compatible': { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
					'title': { name: 'theme-color', contnet: '#00539e' },
					'title': { name: 'title', contnet: title },
					'description': { name: 'description', contnet: description },
					'keyword': { name: 'keywords', content: '' },
					'og:title': { property: 'og:title', content: title },
					'og:description': { property: 'og:description', content: description },
					'og:type': { property: 'og:type', content: 'application' },
					'og:url': { property: 'og:url', content: '' },
					'og:image': { property: 'og:image', content: ogimageUrl },
					'twitter:card': { name: 'twitter:card', content: ogimageUrl },
					'twitter:title': { name: 'twitter:title', content: title },
					'twitter:description': { name: 'twitter:description', content: description },
					'twitter:image': { name: 'twitter:image', content: ogimageUrl },
				},
				templateContent: `
					<!doctype html>
					<html>
						<head>
              <title>${title}</title>
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

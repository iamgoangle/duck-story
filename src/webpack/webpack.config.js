const root = require('app-root-path')
const webpack = require('webpack')
const path = require('path')

const WebpackBrowserPlugin = require('webpack-browser-plugin')

const ENTRY_DIR = path.resolve(__dirname, root.toString(), 'src/index.js')
const BUNDLE_DIR = path.resolve(__dirname, root.toString(), 'dist/src/app')

let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	devtool: 'source-map',
	entry: {
		dev: ENTRY_DIR
	},
	devServer: {
		// hot: true,
		inline: true,
		progress: true,
		historyApiFallback: true,
		port: 3030
	},
	output: {
		// publicPath: '/dist/',
		path: BUNDLE_DIR,
		filename: '[name].bundle.js'
	},
	resolve: {
		root: [
			path.resolve(__dirname, 'node_modules')
		],
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js', '.json', '.scss']
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			template: path.resolve(__dirname, 'index.template.html'),
			favicon: path.resolve(__dirname, 'favicon.ico'),
			filename: 'index.html',
			titie: 'Just another ReacrJS play ground.',
			cache: true,
			inject: 'body'
		}),
		new WebpackBrowserPlugin({
			browser: 'Chrome',
			port: 3030,
			url: 'http://localhost'
		})
	],
	module: {
		loaders: [{
			test: /\.(js)$/,
			exclude: /node_modules/,
			// cacheDirectory: true,
			loader: 'babel-loader'
		}, {
			test: /\.(jsx)$/,
			exclude: /node_modules/,
			// cacheDirectory: true,
			loader: 'babel-loader'
		}, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader?mimetype=image/svg+xml'
		}, {
			test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			loader: "file-loader?mimetype=application/font-woff"
		}, {
			test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			loader: "file-loader?mimetype=application/font-woff"
		}, {
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: "file-loader?mimetype=application/octet-stream"
		}, {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: "file-loader"
		}]
	}
}

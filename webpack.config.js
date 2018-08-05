var webpack = require('webpack');
var path = require("path");

var config = {
	entry: path.resolve('./store.js'),

	output: {
		path: path.resolve('./'),
		filename: 'bundle.js',
		publicPath: '/',
	},

	module: {
		loaders: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',

			query: {
				presets: ['es2015', 'react', 'stage-1']
			}
		}
		]
	},
	// devServer: {
  //   historyApiFallback: true,
  // },
	resolve:{
		extensions: ['.js','.jsx','index.js','index']
	}
}

module.exports = config;

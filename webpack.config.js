/**
 * Developed By Satyavan Dash
 */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const glob_entries = require('webpack-glob-entries');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extend = require('extend');
const entry = require('webpack-glob-entry')
 
 module.exports = {
	 entry: glob_entries('./src/_index/*.js'),
	 output: {
		path: path.resolve(__dirname, 'dist'),
	    filename: '[name].js'
	  },
	  module: {
	    rules: [
	      {
	        test: /\.jsx?$/,
	        exclude: /node_modules/,
	        loader: 'babel-loader',
	        query: {
	           presets: ['es2015', 'react']
	        }
	      },
	      {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
            	fallback: 'style-loader',
            	use: ['css-loader', 'sass-loader']
            })
	      }
	    ]
	  },
	   plugins: [
		   new CleanWebpackPlugin(['dist']),
		   new ExtractTextPlugin({ // define where to save the file
			   filename: 'dist/[name].css',
			   allChunks: true,
		   }),
	   ]
 }
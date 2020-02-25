/* globals module */

const webpack = require('webpack');
const path = require('path');
const config = require('sapper/config/webpack.js');

const pkg = require('./package.json');

const mode = process.env.NODE_ENV || 'development';
const dev = mode === 'development';

const alias = { svelte: path.resolve('node_modules', 'svelte') };
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html'];
const mainFields = ['svelte', 'module', 'browser', 'main'];

module.exports = {
	client: {
		mode: mode,
		entry: config.client.entry(),
		output: config.client.output(),
		resolve: { alias, extensions, mainFields },
		module: {
			rules: [
				{
					test: /\.(svelte|html)$/,
					use: {
						loader: 'svelte-loader-hot',
						options: {
							dev, // NOTE dev mode is REQUIRED for HMR
							hydratable: true,
							preserveWhitespace: true,
							preserveComments: true,
							hotReload: true,
							hotOptions: {
								// optimistic will try to recover from runtime errors during
								// component init (instead of doing a full reload)
								optimistic: false
							}
						}
					}
				}
			]
		},
		plugins: [
			// pending https://github.com/sveltejs/svelte/issues/3632
			dev && new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
		].filter(Boolean),
		devtool: dev && 'inline-source-map'
	},

	server: {
		entry: config.server.entry(),
		output: config.server.output(),
		target: 'node',
		resolve: { alias, extensions, mainFields },
		externals: Object.keys(pkg.dependencies).concat('encoding'),
		module: {
			rules: [
				{
					test: /\.(svelte|html)$/,
					use: {
						// you don't need svelte-loader-hot here, but it avoids having to
						// also install svelte-loader
						loader: 'svelte-loader-hot',
						options: {
							css: false,
							generate: dev ? 'dom' : 'ssr',
							preserveWhitespace: true,
							preserveComments: true,
							dev
						}
					}
				}
			]
		},
		mode: mode,
		performance: {
			hints: false // it doesn't matter if server.js is large
		}
	},

	serviceworker: {
		entry: config.serviceworker.entry(),
		output: config.serviceworker.output(),
		mode: mode
	}
};

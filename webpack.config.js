//Ce qui à trait au Javascript est commenté. Pour l'instant, cette configuration ne gère que le SASS.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const path = require('path');

module.exports = {
	//devtool: 'source-map',
	entry: {
		//js: './src/js/assemblage.js',
		scripts: [
			'./src/js/lazy-background-image.js',
			'./src/js/contenu-extensible.js',
			'./src/js/tabbed-interface.js',
			'./src/js/collapsible-sections.js'
		],
		principale: './src/sass/assemblage.scss',
		etudes: [
			'./src/sass/layout/_container.scss',
			'./src/sass/composantes/_contenu-extensible.scss',
			'./src/sass/composantes/_collapsible-sections.scss',
			'./src/sass/composantes/_onglets.scss',
			'./src/sass/composantes/_fiche-etudes.scss',
			'./src/sass/composantes/_cours-carte.scss',
			'./src/sass/composantes/_cours-element.scss',
		]
	},
	output: {
		path: path.resolve(__dirname),
		filename: 'js/[name].js',
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						/*options: {
							sourceMap: true,
						}*/
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								//outputStyle: 'compressed',
								sourceMap: true,
							},
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							emitFile: false, // Éviter que les fichiers soient copiés dans le dossier "build". On gére le tout manuellement.
							name: '[path][name].[ext]', // Conserver le nom des fichiers.
						},
					},
				],
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						//plugins: ['lodash'],
						presets: [
							["@babel/preset-env", {
								"targets": ["last 2 versions"]
							}]
						],
						cacheDirectory: true
					}
				}
			}
			// Linting JavaScript à l'enregistrement des fichiers
			/*{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
			},*/
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		}),
		// Linting CSS à l'enregistrement des fichiers
		new StylelintPlugin({
			lintDirtyModulesOnly: true,
			failOnError: false,
			failOnWarning: false,
		}),
	],
};

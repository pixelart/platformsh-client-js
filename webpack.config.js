var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.env;
var merge = require('webpack-merge');

var libraryName = 'platform-api';

var plugins = [], outputFile;

if (env.mode === 'build') {
  plugins.push(new UglifyJsPlugin({
    minimize: true,
    compress: {
		    warnings: false,
		    drop_console: true
  	},
  	comments: false
  }));
  outputFile = '[name].min.js';
} else {
  outputFile = '[name].js';
}

var config = {
  entry: {
    [libraryName]:  __dirname + '/src/index.js',
    'authentication/index':  __dirname + '/src/authentication',
  },
  output: {
    filename: outputFile,
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules'
    ],
    extensions: ['.js']
  },
  plugins: plugins
};

var client = merge(config, {
  target: 'web',
  output: {
    path: __dirname + '/lib/client',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
});

var server = merge(config, {
  target: 'node',
  output: {
    path: __dirname + '/lib/server',
    libraryTarget: 'commonjs',
  },
});

module.exports = [client, server];

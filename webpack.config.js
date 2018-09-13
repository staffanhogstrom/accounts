var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {

  return {
    entry: './src/client/index.jsx',
    output: {
      path: path.resolve('dist'),
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-3']
          }
        }
      ]
    },
    plugins: [new HtmlWebpackPlugin({
      template: './src/client/index.html',
      filename: 'index.html',
      inject: 'body'
    })],
    devServer: {
      historyApiFallback: true,
      port: 8081,
      open: true,
    },
    externals: {
      // global app config object
      config: env === 'production' ? JSON.stringify({ apiUrl: '/api' }) : JSON.stringify({ apiUrl: 'http://localhost:8080/api' })
    }
  };
};
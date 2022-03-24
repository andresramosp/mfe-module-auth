
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/org-auth.js',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 9898,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
        },
      },
    ],
  },
  plugins: [
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    new ModuleFederationPlugin({
      name: 'ModuleAuth',
      filename: 'remoteEntry.js',
      exposes: {
        './ModuleAuth': './src/org-auth.js',
      },
      shared: require('./package.json').dependencies,
    }),
  ],
};

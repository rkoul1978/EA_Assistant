const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "util": require.resolve("util/")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ]
};

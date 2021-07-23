const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  target: "node",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "production",
  resolveLoader: {
    modules: [__dirname, "/node_modules/"],
  },
};
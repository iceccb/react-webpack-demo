var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var fs = require('fs');
var path = require('path');
var srcPath = path.join(__dirname, 'src');

var entry = fs.readdirSync(srcPath).reduce(function (entries, dir) {
    if (fs.statSync(path.join(srcPath,dir)).isDirectory())
      entries[dir] = [path.join(srcPath, dir, 'app.js'),"webpack/hot/dev-server"]
    return entries
  }, {});
entryKey = Object.keys(entry);
module.exports = {
  entry: entry,
    output: {
      path: __dirname + '/__build__',
      filename: '[name].bundle.js',
      chunkFilename: '[id].chunk.js',
      publicPath: '/assets/'
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /shared/, loader: 'babel' },
        // { test: /\.css$/, loader: 'style!css' },
        {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
        {test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,  
        loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[ext]' }
      ]
    },
    // externals: { jquery: "jQuery" },
    resolve: { alias: { jQuery: __dirname + "/shared/thirdparty/jquery.min.js" } },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react'
        }),
      new webpack.optimize.UglifyJsPlugin({
          compress: {
                  warnings: false
              }
      }),
      new webpack.optimize.CommonsChunkPlugin('commons.js',entryKey),
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin("[name].css")
    ]

}
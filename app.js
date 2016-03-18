var webpack = require('webpack');
var webpackDevServer = require("webpack-dev-server");
var config = require("./webpack.config.js");
var path = require('path');
//If you have several entry points in entry configuration option,
// make sure webpack/hot/only-dev-server is in each of them
// https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md
config.entry.app="webpack-dev-server/client?http://localhost:8080/";
var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
  publicPath: "/assets/",
  hot: true,
  stats: {
    colors: true
  }
});
server.listen(8080);
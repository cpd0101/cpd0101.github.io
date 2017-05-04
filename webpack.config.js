// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展

const webpack = require('webpack')

module.exports = function(webpackConfig) {
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: 'css',
  }]);

  webpackConfig.plugins = webpackConfig.plugins.filter(plugin => !(plugin instanceof webpack.optimize.CommonsChunkPlugin))

  return webpackConfig;
};

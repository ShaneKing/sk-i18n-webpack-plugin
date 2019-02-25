const SKI18NWebpackPlugin = require('./lib/index.js');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  node: {
    fs: 'empty',
    crypto: 'empty'
  },
  plugins: [
    new SKI18NWebpackPlugin({
      verbose: true,
      folderMapping: {codesAddress: 'codes'},
      dist: 'json',
      srcs: ['public/json/codes_en_US.json', 'public/json/codesAddress_en_US.json', 'public/json/i18n_en_US.json', 'public/json/i18n_zh_CN.json']
    })
  ]
};

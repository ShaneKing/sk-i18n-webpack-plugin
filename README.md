<div align="center">
  <a href="https://github.com/ShaneKing">
    <img width="200" height="200" src="https://avatars3.githubusercontent.com/u/3394899">
  </a>
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>sk-i18n-webpack-plugin</h1>
  <p>I18N Webpack Plugin for ShaneKing</p>
</div>

[![npm][npm]][npm-url]


<h2 align="center">Install</h2>

```bash
# for webpack 4+
npm install --save-dev sk-i18n-webpack-plugin
```

<h2 align="center">Usage</h2>

> :warning: Since webpack v4

```js
const SKI18NWebpackPlugin = require("sk-i18n-webpack-plugin");

module.exports = {
  plugins: [
    new SKI18NWebpackPlugin({
      folderMapping: {codesAddress: 'codes'},
      dist: 'json',
      srcs: ['public/json/codes_en_US.json', 'public/json/codesAddress_en_US.json', 'public/json/i18n_en_US.json', 'public/json/i18n_zh_CN.json']
    })
  ]
};
```

<h2 align="center">Options</h2>

```js
new SKI18NWebpackPlugin(options: object)
```

|Name|Type|Description|
|:--:|:--:|:----------|
|**`srcs`**|`{Array}`|the i18n json files|
|**`dist`**|`{String}`|output path (Relative to the outputPath)|
|**`folderMapping`**|`{Object}`|mapping for big code table|
|**`hashAlgorithm`**|`{String}`|hash algorithm|
|**`hashLength`**|`{Integer}`|length of hash use in file name|
|**`verbose`**|`{Boolean}`|log|



[npm]: https://img.shields.io/npm/v/sk-i18n-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/sk-i18n-webpack-plugin

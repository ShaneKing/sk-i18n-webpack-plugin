import fs from 'fs';
import crypto from 'crypto';
import {Mesgs} from 'sk-js';

export default class SKI18nWebpackPlugin {
  constructor(options = {}) {
    this.options = Object.assign({}, {srcs: [], folderMapping: {}, dist: 'dist/json', hashAlgorithm: 'md5', hashLength: 8}, options);
    this.files = [];
    this.folderLanguageHashObject = {};
    this.folderLanguageHashFilePath = {};
  }

  apply(compiler) {
    const that = this;

    if (that.options.verbose) {
      console.log('SKI18nWebpackPlugin');
    }

    const emitHook = (compilation, cb) => {

      if (that.options.verbose) {
        console.log('SKI18nWebpackPlugin.afterEmit');
      }

      try {
        that.options.srcs.forEach((srcFilePath) => {

          if (that.options.verbose) {
            console.log(srcFilePath);
          }

          let srcFilePaths = srcFilePath.split('/');
          let jsonFilename = srcFilePaths[srcFilePaths.length - 1];
          let folder = jsonFilename.split('_')[0];
          let languageFilename = jsonFilename.split(folder)[1];
          folder = that.options.folderMapping[folder] ? that.options.folderMapping[folder] : folder;

          if (!that.folderLanguageHashFilePath[folder + languageFilename]) {
            that.folderLanguageHashFilePath[folder + languageFilename] = folder + '_Hash' + languageFilename;
          }

          if (!that.folderLanguageHashObject[folder + languageFilename]) {
            that.folderLanguageHashObject[folder + languageFilename] = {};
          }

          let hashObject = that.folderLanguageHashObject[folder + languageFilename];
          let jsonObject = JSON.parse(fs.readFileSync(srcFilePath).toString());

          if (that.options.verbose) {
            console.log(jsonObject);
          }

          let pathObjects = {};
          Mesgs.jsonNodeParser(jsonObject, '', pathObjects);
          Object.keys(pathObjects).forEach((pathStr) => {
            let strContent = JSON.stringify(pathObjects[pathStr]);
            let hashValue = crypto.createHash(that.options.hashAlgorithm).update(strContent).digest('hex').slice(0, that.options.hashLength);
            hashObject[pathStr] = hashValue;

            if (that.options.verbose) {
              console.log(that.options.dist + '/' + folder + pathStr + hashValue + languageFilename);
              console.log(strContent);
            }

            compilation.assets[that.options.dist + '/' + folder + pathStr + hashValue + languageFilename] = {
              source: function () {
                return strContent;
              },
              size: function () {
                return strContent.length;
              }
            };
          });
        });
        Object.keys(that.folderLanguageHashFilePath).forEach((folderLanguage) => {
          let strContent = JSON.stringify(that.folderLanguageHashObject[folderLanguage]);

          if (that.options.verbose) {
            console.log(that.options.dist + '/' + that.folderLanguageHashFilePath[folderLanguage]);
            console.log(strContent);
          }

          compilation.assets[that.options.dist + '/' + that.folderLanguageHashFilePath[folderLanguage]] = {
            source: function () {
              return strContent;
            },
            size: function () {
              return strContent.length;
            }
          };
        });
      } catch (error) {
        compilation.errors.push(error);
      }

      cb();
    };

    if (compiler.hooks) {
      compiler.hooks.emit.tapAsync('SKI18nWebpackPlugin', emitHook);
    } else {
      compiler.plugin('emit', emitHook);
    }
  }
}

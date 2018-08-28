const marked = require('marked');
// 個別のrenderの仕方について、rendererで定義
const renderer = new marked.Renderer();
const headingTagRenderer = require('./renderer/headingTagRenderer');
const codeTagRenderer = require('./renderer/codeTagRenderer');

module.exports = function (data) {
  return marked(data, { renderer: renderer, baseUrl: false });
  // 最後のsection閉じタグが足りていないことに注意
};

renderer.heading = function (text, level) {
  return headingTagRenderer(text, level);
};

renderer.code = function (code, language, escaped) {
  return codeTagRenderer(code, language, escaped);
};

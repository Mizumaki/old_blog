const marked = require('marked');
// 個別のrenderの仕方について、rendererで定義
const renderer = new marked.Renderer();
const headingTagRenderer = require('./renderer/headingTagRenderer');
const codeTagRenderer = require('./renderer/codeTagRenderer');

module.exports = function (data) {
  return marked(data, { renderer: renderer });
  // 最後のsection閉じタグが足りていないことに注意
};

renderer.heading = function (text, level) {
  return headingTagRenderer(text, level);
};

renderer.code = function (code, language, escaped) {
  return codeTagRenderer(code, language, escaped);
};

renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${ href }" title="${ title }">${ text }</a>`;
};

renderer.image = function (href, title, text) {
  return `<img href="https://storage.googleapis.com/blog-2e0d2.appspot.com/img/${href}" title="${text}" alt="${text}">`;
}
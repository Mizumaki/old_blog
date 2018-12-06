const marked = require('marked');
// 個別のrenderの仕方について、rendererで定義
const renderer = new marked.Renderer();
const headingTagRenderer = require('./renderer/headingTagRenderer');
const codeTagRenderer = require('./renderer/codeTagRenderer');
const firebase = require('./firebase');
const storage = firebase.storage;

module.exports = function (data) {
  return marked(data, {
    renderer: renderer
  });
  // 最後のsection閉じタグが足りていないことに注意
};

renderer.heading = function (text, level) {
  return headingTagRenderer(text, level);
};

renderer.code = function (code, language, escaped) {
  return codeTagRenderer(code, language, escaped);
};

renderer.link = function (href, title, text) {
  if (title) {
    return `<a target="_blank" href="${ href }" title="${ title }">${ text }</a>`;
  } else {
    return `<a target="_blank" href="${ href }">${ text }</a>`;
  }
};

renderer.image = function (href, title, text) {
  if (title) {
    return `<figure><amp-img src="${href}" layout="responsive" title="${text}" alt="${text}"></amp-img><figcaption>${title}</figcaption></figure>`;
  } else {
    return `<figure><amp-img src="${href}" layout="responsive" title="${text}" alt="${text}"></amp-img></figure>`;
  }
}
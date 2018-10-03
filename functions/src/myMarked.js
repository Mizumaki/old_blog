const marked = require('marked');
// 個別のrenderの仕方について、rendererで定義
const renderer = new marked.Renderer();
const headingTagRenderer = require('./renderer/headingTagRenderer');
const codeTagRenderer = require('./renderer/codeTagRenderer');
const firebase = require('./firebase');
const storage = firebase.storage;

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
  if (title) {
    return `<a target="_blank" href="${ href }" title="${ title }">${ text }</a>`;
  } else {
    return `<a target="_blank" href="${ href }">${ text }</a>`;
  }
};

renderer.image = function (href, title, text) {
  storage.bucket().file("img/" + href).get().then((data) => {
    console.log(data);
    console.log(data.naturalWidth);
    console.log(data.naturalHeight);
    const width = data.naturalWidth;
    const height = data.naturalHeight;
    return `<amp-img href="https://storage.googleapis.com/blog-2e0d2.appspot.com/img/${href}" width="${width}" height="${height}" layout="responsive" title="${text}" alt="${text}">`;
  }).catch((error) => { throw error;})
}
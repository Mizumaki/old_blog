const path = require('path');
const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/');
loadLanguages(['jsx', 'ruby']);

module.exports = function (code, file_name, escaped) {
  const file_ext = path.extname(file_name);
  console.log(file_ext)
  let language;
  let highlighted_code;
  switch (file_ext) {
    case '.js':
      language = 'javascript'
      highlighted_code = Prism.highlight(code, Prism.languages.javascript, language);
      break;
    case '.jsx':
      language = 'jsx'
      highlighted_code = Prism.highlight(code, Prism.languages.jsx, language);
      break;
    case '.html':
      language = 'markup'
      highlighted_code = Prism.highlight(code, Prism.languages.markup, language);
      break;
    case '.css':
      language = 'css'
      highlighted_code = Prism.highlight(code, Prism.languages.css, language);
      break;
    case '.rb':
      language = 'ruby'
      highlighted_code = Prism.highlight(code, Prism.languages.ruby, language);
      break;
    default:
      highlighted_code = code;
      break;
  }
  // 改行を入れると、preで囲まれているので影響が出る。気を付けること
  return `
          <pre class="language-${language}"><code>${highlighted_code}</code></pre>`;
};
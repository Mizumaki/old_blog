const path = require('path');
const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/');
loadLanguages(['jsx', 'ruby']);

module.exports = function (code, file_name, escaped) {
  if (file_name === undefined) {
    file_name = ""
  }
  // ファイル名の拡張子を取得
  const file_ext = path.extname(file_name);
  let language;
  let highlighted_code;
  if (file_ext) {
    switch (file_ext) {
      case '.js':
      case '.sol':
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
        language = ""
        highlighted_code = code;
        break;
      }
    } else {
    switch (file_name) {
      //case "console":
      //  language = 'bash'
      //  highlighted_code = Prism.highlight(code, Prism.languages.bash, language);
      //  break;
      case "javascript":
      case "solidity":
        language = 'javascript';
        highlighted_code = Prism.highlight(code, Prism.languages.javascript, language);
        break;
      case "react":
        language = "jsx";
        highlighted_code = Prism.highlight(code, Prism.languages.jsx, language);
        break;
      case "html":
        language = "markup";
        highlighted_code = Prism.highlight(code, Prism.languages.markup, language);
        break;
      case "css":
        language = "css";
        highlighted_code = Prism.highlight(code, Prism.languages.css, language);
        break;
      case "ruby":
        language = "ruby";
        highlighted_code = Prism.highlight(code, Prism.languages.ruby, language);
        break;
      default:
        language = file_name
        highlighted_code = code;
        break;
    }
  }
  // 改行を入れると、preで囲まれているので影響が出る。気を付けること
  return `
          <pre class="language-${language}"><span class="file-name ${language}">${file_name}</span><code>${highlighted_code}</code></pre>`;
};
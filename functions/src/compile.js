const fs = require('fs');
const path = require('path');
const myMarked = require('./myMarked');

function compileMarkdownToHtml(md_path) {
  fs.readFile(md_path, 'utf8', function (err, md_data) {

    if (err) {
      throw err;
    }

    const html_data = myMarked(md_data);

    const file_name = path.basename(md_path, path.extname(md_path));

    const build_file = './build/' + file_name + '.amp.html';
    fs.writeFile(build_file, html_data, function (error) {
      if (error) {
        throw error;
      }
    });
  });
}

compileMarkdownToHtml('./from/article.md');
const fs = require('fs');
const ejs = require('ejs');
const cheerio = require('cheerio');
const minify = require('html-minifier').minify;
const firebase = require('./firebase');
const db = firebase.db;
const storage = firebase.storage;
const myMarked = require('./myMarked');

const articles = db.collection("articles")
const get_article = () => {
  return articles.doc("article").get()
    .then((doc) => {
      const data = doc.data();
      const md_data = data.body;
      const compiled_md_data = myMarked(md_data);
      // 最後の</section>が足りないので、操作
      data.body = compiled_md_data + '</section>'
      console.log("Gettting article md file is success, and compiled!", data.body);
      return data;
    })
    .catch(error => console.log("Error getting document:", error))
}

const buildHtml = () => {
  get_article()
    .then((data) => {
      console.log(`in buildHtml with data : ${data}`)
      const html = fs.readFile('src/main_amp.ejs', 'utf-8', ((err, main_ejs) => {
        console.log("in reading ejs")
        if (err) {
          throw err;
        }
        const builded_html = ejs.render(main_ejs, {
          filename: 'src/main_amp.ejs',
          data: data
        });
        console.log("ejs builded")
        return builded_html;
      }))
      return html;
    }).catch(error => console.log("Error building html by ejs :", error))
    .then((html) => {
      console.log('ejs builded html is this ↑')
      console.log(html)
      // 文字列のhtmlデータを、htmlにしてjQueryライクに扱えるようにする。
      const $ = cheerio.load(html, {
        decodeEntities: true
      });

      // headerは別途生成しているので、markedで生成したものは削除
      $('#header').remove();

      const agenda = []

      $('div.article-main section').each(((node) => {
        $(node).find('h2').each(((h2) => {
          const array = {
            "h2": $(h2).text(),
            "h3": []
          }
          const count = $(node).find('h3');
          if (count.length >= 1) {
            $(node).find('h3').each(((h3) => {
              array.h3.push($(h3).text());
            }))
          }
          agenda.push(array);
        }))
      }))
      console.log('agenda is correct ? :', agenda)
      const agenda_html = makeAgenda(agenda);
      // 目次をhtmlに挿入
      $(agenda_html).insertAfter('header.article');
      return $.html();
    }).catch(error => console.log("Error in make agenda :", error))
    .then((html) => {
      console.log("html with agenda is correct ? : ",html);
      // htmlを圧縮
      const minified_html = minify(html, {
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true
      });
      return minified_html
    }).catch(error => console.log("Error in minified html :", error))
    .then((html) => {
      console.log("minified html is correct ? :", html);
      const file_path = 'article/article.amp.html'
      storage.bucket().file(file_path).createWriteStream(minified_html);
      return "success";
    }).catch(error => console.log("Error in uploading storage :", error));
}

const makeAgenda = (data) => {
  return fs.readFile('src/components/article/_agenda.ejs', 'utf-8', ((err, ejs_file) => {
    if (err) {
      reject;
    }
    return ejs.render(ejs_file, {
      filename: 'src/components/article/_agenda.ejs',
      agenda: data
    });
  }))
}

//const makeAgenda = (data) => {
//  return new Promise(((resolve, reject) => {
//    fs.readFile('src/components/article/_agenda.ejs', 'utf-8', ((err, ejs_file) => {
//      if (err) {
//        reject;
//      }
//      const html = ejs.render(ejs_file, {
//        filename: 'src/components/article/_agenda.ejs',
//        agenda: data
//      });
//      resolve(html);
//    }))
//  }));
//}

exports.module = buildHtml();
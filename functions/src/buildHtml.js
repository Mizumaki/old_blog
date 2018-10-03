const fs = require('fs');
const ejs = require('ejs');
const cheerio = require('cheerio');
const minify = require('html-minifier').minify;
const firebase = require('./firebase');
const db = firebase.db;
const storage = firebase.storage;
const myMarked = require('./myMarked');

const articles = db.collection("articles")

const buildHtml = () => {
  articles.doc("article").get()
    .then((doc) => {
      const data = doc.data();
      console.log("data is loaded :", data);
      const md_data = data.body;
      const compiled_md_data = myMarked(md_data);
      // 最後の</section>が足りないので、操作
      data.body = compiled_md_data + '</section>';
      console.log("Gettting article md file is success, and compiled!", data.body);
      return data;
    })
    .then((data) => {
      build(data);
      return "success";
//      console.log("in buildHtml with data : ", data)
//      const html = fs.readFileSync('src/main_amp.ejs', 'utf-8')
//      console.log()
//      //const html = fs.readFile('src/main_amp.ejs', 'utf-8', ((err, main_ejs) => {
//      //  console.log("in reading ejs")
//      //  if (err) {
//      //    throw err;
//      //  }
//      //  console.log("main_ejs is :", main_ejs)
//      //  const builded_html = ejs.render(main_ejs, {
//      //    filename: 'src/main_amp.ejs',
//      //    data: data
//      //  });
//      //  console.log("ejs builded")
//      //  return builded_html;
//      //}));
//      return html;
//    })
//    .then((html) => {
//      console.log('ejs builded html is this ↑')
//      console.log(html)
//      // 文字列のhtmlデータを、htmlにしてjQueryライクに扱えるようにする。
//      const $ = cheerio.load(html, {
//        decodeEntities: true
//      });
//
//      // headerは別途生成しているので、markedで生成したものは削除
//      $('#header').remove();
//
//      const agenda = []
//
//      $('div.article-main section').each(((node) => {
//        $(node).find('h2').each(((h2) => {
//          const array = {
//            "h2": $(h2).text(),
//            "h3": []
//          }
//          const count = $(node).find('h3');
//          if (count.length >= 1) {
//            $(node).find('h3').each(((h3) => {
//              array.h3.push($(h3).text());
//            }))
//          }
//          agenda.push(array);
//        }))
//      }))
//      console.log('agenda is correct ? :', agenda)
//      const agenda_html = makeAgenda(agenda);
//      // 目次をhtmlに挿入
//      $(agenda_html).insertAfter('header.article');
//      return $.html();
//    })
//    .then((html) => {
//      console.log("html with agenda is correct ? : ", html);
//      // htmlを圧縮
//      const minified_html = minify(html, {
//        collapseWhitespace: true,
//        minifyCSS: true,
//        removeComments: true
//      });
//      return minified_html
//    })
//    .then((html) => {
//      console.log("minified html is correct ? :", html);
//      const file_path = 'article/article.amp.html'
//      storage.bucket().file(file_path).createWriteStream(minified_html);
//      return "success";
    }).catch(error => console.log("Error :", error))
}

function build(data) {
  fs.readFile('src/main_amp.ejs', 'utf-8', function (err, ejs_file) {
    if (err) {
      console.log(err);
      throw err;
    }
    const builded_html = ejs.render(ejs_file, {
      filename: 'src/main_amp.ejs',
      data: data
    });
    // 文字列のhtmlデータを、htmlにしてjQueryライクに扱えるようにする。
    const $ = cheerio.load(builded_html, {
      decodeEntities: true
    });
    // headerは別途生成するので、markedで生成したものは削除
    $('#header').remove();

    let agenda = []

    $('div.article-main section').map(function (i, node) {
      $(node).find('h2').map(function (i, h2) {
        const array = {
          "h2": $(h2).text(),
          "h3": []
        }
        const count = $(node).find('h3')
        if (count.length >= 1) {
          $(node).find('h3').map(function (i, h3) {
            array.h3.push($(h3).text());
          })
        }
        agenda.push(array);
      })
    })
    console.log(agenda);
    makeAgenda(agenda)
      .then(function (agenda_html) {
        $(agenda_html).insertAfter('header.article');
        const minified_html = minify($.html(), {
          collapseWhitespace: true,
          minifyCSS: true,
          removeComments: true
        })
        console.log(minified_html)
        const file_path = 'article/article.amp.html'
        const fileRef = storage.bucket().file(file_path);

        fileRef.save(minified_html, function (err) {
          if (err) {
            console.log("writing file error", err)
          }
          console.log("書き込み完了");
        })
        return 'success'
      }).catch(console.log("Error in make agenda :"))
  });
}

//const makeAgenda = (data) => {
//  return fs.readFile('src/components/article/_agenda.ejs', 'utf-8', ((err, ejs_file) => {
//    if (err) {
//      reject;
//    }
//    return ejs.render(ejs_file, {
//      filename: 'src/components/article/_agenda.ejs',
//      agenda: data
//    });
//  }))
//}

const makeAgenda = (data) => {
  return new Promise(((resolve, reject) => {
    fs.readFile('src/components/article/_agenda.ejs', 'utf-8', ((err, ejs_file) => {
      if (err) {
        reject;
      }
      const html = ejs.render(ejs_file, {
        filename: 'src/components/article/_agenda.ejs',
        agenda: data
      });
      resolve(html);
    }))
  }));
}

module.exports = buildHtml();
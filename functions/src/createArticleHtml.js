const fs = require('fs');
const ejs = require('ejs');
const cheerio = require('cheerio');
const minify = require('html-minifier').minify;
const firebase = require('./firebase');
const storage = firebase.storage;
const myMarked = require('./myMarked');

const createArticleHtml = (data, context) => {
  console.log("in createArticle Html");
  //console.log("snap from firestore is this : ", snap.data());
  //const data = snap.data();
  const md_data_path = data.body;
  console.log("storage path is : ", md_data_path);
  const file = storage.bucket().file(md_data_path);
  console.log("it is fucking statham version!!")
  return file.download()
    .then((file_data) => {
      console.log("data[0].toString is this :", file_data[0].toString('utf-8'));
      const text_file_data = file_data[0].toString('utf-8');
      return text_file_data;
    })
    .then((md_data) => {
      console.log("next action is mdToHtml");
      return mdToHtml(md_data);
    })
    .then((body_html) => {
      data.body = body_html;
      console.log("data is now have html : ", data);
      return buildHtml(data);
    })
    .then((html) => {
      console.log("compiled html is send to next func : ", html);
      // htmlのテキストデータを、htmlファイルのように扱えるようにする。
      return cheerio.load(html, {
        decodeEntities: true
      }, (err) => {
        throw err;
      });
    })
    .then(($) => {
      console.log("$'s html is this :", $.html());
      $('#header').remove();
      makeAgenda($, (err, agenda) => {
        if (err) {
          throw err;
        }
        agendaToHtml(agenda, (err, agenda_html) => {
          if (err) {
            console.log(err);
          }
          $(agenda_html).insertAfter('header.article');
        });
      })
      return $.html();
    })
    .then((html) => {
      const minified_html = minify(html, {
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true
      })
      console.log("this is minified_html :", minified_html);
      return minified_html;
    })
    .then((html) => {
      const file_path = 'article/a.amp.html'
      const fileRef = storage.bucket().file(file_path);

      fileRef.save(html, (err) => {
        if (err) {
          console.log("writing file error", err)
        }
        console.log("書き込み完了");
      })
      return 'success';
    })
    .catch((error) => console.log("createArticleHtmlでエラーだ！てぇへんだ！", error))
}

const mdToHtml = (md_data) => {
  return new Promise((resolve, reject) => {
    console.log("in mdToHtml");
    const compiled_md_data = myMarked(md_data);
    if (compiled_md_data === undefined) {
      const error = "md parsing is something wrong"
      reject(error);
    }
    // 最後の</section>が足りないので、操作
    html_data = compiled_md_data + '</section>';
    console.log("Gettting article md file is success, and compiled!", html_data);
    resolve(html_data);
  })
}

const buildHtml = (data) => {
  return new Promise((resolve, reject) => {
    console.log("in buildHtml");
    ejs.renderFile('src/main_amp.ejs', {
        filename: 'src/main_amp.ejs',
        data: data
      }, 'utf-8',
      (error, html) => {
        if (error) {
          reject(error);
        }
        console.log("html by ejs is this : ", html);
        resolve(html);
      })
  })
}

const makeAgenda = (cheerio_object) => {
  return new Promise((resolve, reject) => {
    console.log("In makeAgenda");
    const $ = cheerio_object;
    const agenda = [];
    $('div.article-main section').map((i, node) => {
      return $(node).find('h2').map((i, h2) => {
        const array = {
          "h2": $(h2).text(),
          "h3": []
        }
        const count = $(node).find('h3');
        if (count.length >= 1) {
          $(node).find('h3').map((i, h3) => {
            return array.h3.push($(h3).text());
          })
        }
        return agenda.push(array);
      })
    })
    resolve(agenda);
  })
}

const OldmakeAgenda = (cheerio_object) => {
  console.log("In makeAgenda");
  const $ = cheerio_object;
  const agenda = [];
  return Promise.all(
      $('div.article-main section').map((i, node) => {
        return $(node).find('h2').map((i, h2) => {
          const array = {
            "h2": $(h2).text(),
            "h3": []
          }
          const count = $(node).find('h3');
          if (count.length >= 1) {
            $(node).find('h3').map((i, h3) => {
              return array.h3.push($(h3).text());
            })
          }
          return agenda.push(array);
        })
      })
    ).then((agenda) => {
      if (agenda.length === 0) {
        const error = "agenda is not fulfilled"
        throw error;
      }
      console.log("agenda is this : ", agenda);
      return agenda;
    })
    .catch((error) => {
      throw error;
    })
}

const agendaToHtml = (agenda) => {
  console.log("in agendaToHtml");
  return ejs.renderFile('src/components/article/_agenda.ejs', {
      filename: 'src/components/article/_agenda.ejs',
      agenda: agenda
    }, 'utf-8',
    (err, html) => {
      if (err) {
        throw err;
      }
      return html;
    })
}

module.exports = createArticleHtml;
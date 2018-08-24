const fs = require('fs');
const ejs = require('ejs');
const cheerio = require('cheerio');
const minify = require('html-minifier').minify;
const firebase = require('./firebase');
const storage = firebase.storage;
const myMarked = require('./myMarked');

const createArticleHtml = (DATA) => {
  // 以降、このファイルにおけるDATAは、Firestoreから下ってきたデータツリーを指す。
  console.log("in createArticle Html");
  const category = DATA.category
  const articleDataPath = `${category.main}/${category.sub}/${DATA.file_name}`;
  const articleMdDataPath = `md_articles/${articleDataPath}.md`;
  const articleMdFileStorageRef = storage.bucket().file(articleMdDataPath);
  console.log("it is awesome statham version!!")
  return articleMdFileStorageRef.download()
    .then((mdFileData) => {
      console.log("data[0].toString is this :", mdFileData[0].toString('utf-8'));
      const mdTextData = mdFileData[0].toString('utf-8');
      return mdTextData;
    })
    .then((mdData) => {
      return mdToHtml(mdData);
    })
    .then((bodyHtml) => {
      DATA.body = bodyHtml;
      return buildHtml(DATA);
    })
    .then((html) => {
      // htmlのテキストデータを、htmlファイルのように扱えるようにする。
      return cheerio.load(html,{decodeEntities: true}, (err) => {throw err;});
    })
    .then(($) => {
      $('#header').remove();
      return insertAgenda($);
    })
    .then((html) => {
      const minified_html = minify(html, {
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true
      })
      return minified_html;
    })
    .then((html) => {
      // articleDataPath は一番上で定義
      const articleHtmlDataPath = `articles/${articleDataPath}.amp.html`
      const articleHtmlFileStorageRef = storage.bucket().file(articleHtmlDataPath);

      articleHtmlFileStorageRef.save(html, (err) => {
        if (err) {
          console.log("writing file error", err);
          throw err;
        }
        console.log("書き込み完了");
      })
      return 'success';
    })
    .catch((error) => console.log("createArticleHtmlでエラーだ！てぇへんだ！", error))
}

const mdToHtml = (mdData) => {
  return new Promise((resolve, reject) => {
    console.log("in mdToHtml");
    const compiledMdData = myMarked(mdData);
    if (compiledMdData === undefined) {
      const error = "md parsing is something wrong"
      reject(error);
    }
    // 最後の</section>が足りないので、操作
    htmlData = compiledMdData + '</section>';
    resolve(htmlData);
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
        resolve(html);
      })
  })
}

const insertAgenda = $ => {
  console.log("in insertAgenda");
  const agenda = makeAgenda($);
  return agendaToHtml(agenda)
    .then((agenda_html) => {
      $('header.article').after(agenda_html);
      return $.html();
    }).catch(error => console.log(error));
}

const makeAgenda = $ => {
  console.log("in makeAgenda");
  const agenda = [];
  $('div.article-main section').map((_, node) =>
    agenda.push({
      'h2': $(node).find('h2').text(),
      'h3': $(node).find('h3').map((_, h3) => $(h3).text()).get()
    })
  )
  console.log(agenda);
  return agenda;
}

const agendaToHtml = (agenda) => {
  return new Promise((resolve, reject) => {
    console.log("in agendaToHtml");
    ejs.renderFile('src/components/article/_agenda.ejs', {
        filename: 'src/components/article/_agenda.ejs',
        agenda: agenda
      }, 'utf-8',
      (err, html) => {
        if (err) {
          reject(err);
        }
        resolve(html);
      });
  });
}

module.exports = createArticleHtml;
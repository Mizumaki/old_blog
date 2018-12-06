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
  const mdStoragePath = `md_articles/${articleDataPath}.md`;
  const mdStorageRef = storage.bucket().file(mdStoragePath);

  return mdStorageRef.download()
    .then((data) => {
      const mdTextData = data[0].toString('utf-8');
      return mdTextData;
    })
    .then((mdTextData) => {
      return mdToHtml(mdTextData);
    })
    .then((bodyHtml) => {
      DATA.body = bodyHtml;
      return buildHtml(DATA);
    })
    .then((html) => {
      // htmlのテキストデータを、htmlファイルのように扱えるようにする。
      return cheerio.load(html, {
        decodeEntities: true
      }, (err) => {
        throw err;
      });
    })
    .then(($) => {
      $('#header').remove();
      return handleHtml($); //insertAgenda($);
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

const handleHtml = $ => {
  return new Promise((resolve, reject) => {
    addInfoToAmpImgs($)
      .then(() => resolve(insertAgenda($)))
      .catch(err => reject(err))
  })
}

const addInfoToAmpImgs = $ => {
  return new Promise((resolve, reject) => {
    console.log('in addInfoToAmpImgs');
    const ampImgs = $('article.article div.content div.article-main amp-img');
    const srcs = ampImgs.map((_, node) => {
      return $(node).attr('src');
    }).get();
    const getInfoAndAdd = (node) => {
      const src = $(node).attr('src');
      return storage.bucket().file("img/" + src).getMetadata().then((data) => {
        const metadata = data[0];
        console.log(metadata);
        console.log(metadata.metadata.width);
        console.log(metadata.metadata.height);
        const width = metadata.metadata.width;
        const height = metadata.metadata.height;
        $(node).attr('src', `https://storage.googleapis.com/blog-2e0d2.appspot.com/img/${src}`);
        $(node).attr('width', width);
        $(node).attr('height', height);
        return;
      }).catch((err) => reject(err))
    }
    resolve(Promise.all(ampImgs.map((_, node) => getInfoAndAdd(node)).get()));
  })
}

const insertAgenda = $ => {
  return new Promise((resolve, reject) => {
    console.log("in insertAgenda");
    const agenda = makeAgenda($);
    agendaToHtml(agenda)
      .then((agenda_html) => {
        $('header.article').after(agenda_html);
        return resolve($.html());
      }).catch(error => reject(error));
  })
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
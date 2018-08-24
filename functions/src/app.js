const firebase = require('./firebase');
const storage = firebase.storage;

const express = require('express');
const app = express();

const mainCategory = '/(products|web-tech|blockchain|analysis)'
const subCategory = '/(Blog|React|PWA-AMP|Firebase|Dev|Dapps|CryptoCurrency|Google-Analytics)'
// メインとサブカテゴリがパスにあり、第三階層に任意の文字が1回以上続く場合に、記事と見なす
const articlePath = mainCategory + subCategory + '/(.+)'

app.get(articlePath, (req, res) => {
  console.log('in app function and request path : ', req);
  const file = storage.bucket().file('articles' + req + '.amp.html');
  const rs = file.createReadStream();
  const t0 = Date.now();
  res.set({
    "Cache-Control": "max-age=300, s-maxage=31536000",
    "Content-Type": "text/html; charset=utf-8"
  });
  rs.pipe(res);
  rs.on("finish", () => {
    console.log("file stream took", Date.now() - t0, "ms");
  });
  rs.on("error", () => {
    res.status(404).send('Not Found');
  });
});

module.exports = app;
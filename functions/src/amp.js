const firebase = require('./firebase');
const storage = firebase.storage;

const express = require('express');
const amp = express();

const articlePath = '/amp/:main(/(products|front-end|server-side|blockchain|analysis)//(NomadTime|Blazing-Fast-Blog|React|PWA-AMP|HTML-CSS-JS|Firebase|Nodejs|Ruby|Java|Dapps|CryptoCurrency|Google-Analytics)/*)'

amp.get('/amp/:mainCategory/:subCategory/:articleName', (req, res) => {
  console.log('in app.get');
  console.log(`in app function and request path : ${req.params.mainCategory}/${req.params.subCategory}/${req.params.articleName}`);
  const file = storage.bucket().file(`articles/${req.params.mainCategory}/${req.params.subCategory}/${req.params.articleName}.amp.html`);
  const rs = file.createReadStream();
  const t0 = Date.now();
  res.set({
    //"Cache-Control": "max-age=300",
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

module.exports = amp;
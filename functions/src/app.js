const firebase = require('./firebase');
const storage = firebase.storage;
const express = require('express');
const app = express();

app.get('/article', (req, res) => {
  console.log('In app function')
  const file = storage.bucket().file('article/statham.amp.html');
  const rs = file.createReadStream();
  console.log(file);
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
  })
});

module.exports = app;
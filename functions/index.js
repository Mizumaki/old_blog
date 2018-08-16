const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const express = require('express');
const app = express();

app.get('/article', (req, res) => {
  console.log('In app function')
  const storage = admin.storage();
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

exports.app = functions.https.onRequest(app);

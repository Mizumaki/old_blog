const url = require('url');
const express = require('express');
const router = express.Router();

const firebase = require('../../firebase');
const firestore = firebase.db;
firestore.settings({ timestampsInSnapshots: true });

router.get('/main', (req, res) => {
  const queryFirst = 'category.main'
  handleResponse(req, res, queryFirst);
})

router.get('/sub', (req, res) => {
  const queryFirst = 'category.sub'
  handleResponse(req, res, queryFirst);
})

const handleResponse = (req, res, queryFirst) => {
  const reqParts = url.parse(req.url, true);
  const querySecond = reqParts.query.name
  getArticleList(queryFirst, querySecond)
    .then((data) => res.json(data))
    .catch((err) => console.log(err))
}

const getArticleList = (queryFirst, querySecond) => {
  return new Promise((resolve, reject) => {
    firestore.collection('articles').where(queryFirst, '==', querySecond).get()
      .then((querySnapshot) => {
        let statham = [];
        querySnapshot.forEach((doc) => {
          data = doc.data();
          const file_name = data.file_name
          const title = data.header.title
          const lead = data.header.lead
          const mainCategory = data.category.main
          const subCategory = data.category.sub
          const date = data.update.toDate().toLocaleDateString('ja-JP').replace(/-/g, '/');
          const json = {
            path: `/${mainCategory}/${subCategory}/${file_name}`,
            title: title,
            lead: lead,
            subCategory: subCategory,
            date: date,
          }
          statham.push(json);
        });
        return resolve(statham);
      })
      .catch((err) => reject(err))
  })
}

module.exports = router;
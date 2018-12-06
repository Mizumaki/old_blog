const url = require('url');
const express = require('express');
const router = express.Router();

const firebase = require('../../firebase');
const firestore = firebase.db;

router.get('/', (req, res) => {
  handleResponse(req, res);
})

const handleResponse = (req, res) => {
  const reqParts = url.parse(req.url, true);
  const tagName = reqParts.query.name
  getArticleList(tagName)
    .then((data) => res.json(data))
    .catch((err) => console.log(err))
}

const getArticleList = (tagName) => {
  return new Promise((resolve, reject) => {
    firestore.collection('tags').doc(tagName).collection('articles').get()
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
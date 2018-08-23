const createArticleHtml = require("./src/createArticleHtml");

const onCreate = (snap, context) => {
  console.log('in onCreate')
  return handleSnap(snap).then((data) => {
    console.log('in next handle snap')
    return createArticleHtml(data, context);
  }).catch((error) => console.log(error))
}

const handleSnap = (snap) => {
  return new Promise((resolve, reject) => {
    console.log('in handle snap')
    const data = snap.data();
    resolve(data);
  })
}

module.exports = {
  onCreate: onCreate
}
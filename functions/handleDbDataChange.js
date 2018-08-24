const createArticleHtml = require("./src/createArticleHtml");

const onCreate = (snap, _) => {
  console.log('in onCreate');
  return handleSnap(snap).then((data) => {
    return createArticleHtml(data);
  }).catch((error) => console.log(error));
}

const handleSnap = (snap) => {
  return new Promise((resolve, reject) => {
    if (snap === undefined) {
      const error = "snap is undefined"
      reject(error);
    }
    const data = snap.data();
    resolve(data);
  });
}

module.exports = {
  onCreate: onCreate
}
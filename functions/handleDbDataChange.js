const firebase = require('./src/firebase');
const storage = firebase.storage;
const createArticleHtml = require("./src/createArticleHtml");

const onCreate = (snap, _) => {
  console.log('in onCreate');
  return handleSnap(snap).then((data) => {
    return createArticleHtml(data);
  }).catch((error) => console.log(error));
}

const onUpdate = (change, _) => {
  console.log('in onChange');
  return handleSnapChange(change).then((data) => {
    return createArticleHtml(data);
  }).catch((error) => console.log(error));
}

const onDelete = (snap, _) => {
  console.log('in onDelete');
  return handleSnap(snap).then((data) => {
    const filePath = `${data.category.main}/${data.category.sub}/${data.file_name}`
    return deleteAllRelatedFiles(filePath);
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

const handleSnapChange = (change) => {
  return new Promise((resolve, reject) => {
    if (change === undefined) {
      const error = "change is undefined"
      reject(error);
    }
    const data = change.after.data();
    resolve(data);
  });
}

const deleteAllRelatedFiles = (filePath) => {
  const mdFilePath = `md_articles/${filePath}.md`
  const htmlFilePath = `articles/${filePath}.amp.html`
  fileDelete(mdFilePath);
  fileDelete(htmlFilePath);
}

const fileDelete = (targetPath) => {
  storage.bucket().file(targetPath).delete()
    .then(() => console.log('File delete success : ', targetPath))
    .catch((error) => console.log(error))
}

module.exports = {
  onCreate: onCreate,
  onUpdate: onUpdate,
  onDelete: onDelete
}
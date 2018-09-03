const functions = require('firebase-functions');
const app = require('./src/app');
const api = require('./src/api');
const handleDbDataChange = require('./handleDbDataChange');

exports.app = functions.https.onRequest(app);
exports.api = functions.https.onRequest(api);

exports.createNewFile = functions.firestore.document('articles/{docName}')
  .onCreate((snap, context) => {
    return handleDbDataChange.onCreate(snap, context);
  })

exports.changeFile = functions.firestore.document('articles/{docName}')
  .onUpdate((change, context) => {
    // updateであっても、現状はonCreateと動作変わらず。
    return handleDbDataChange.onUpdate(change, context);
  })

exports.deleteFile = functions.firestore.document('articles/{docName}')
  .onDelete((snap, context) => {
    return handleDbDataChange.onDelete(snap, context);
  })
const functions = require('firebase-functions');
const amp = require('./src/amp');
const api = require('./src/api');
const handleDbDataChange = require('./handleDbDataChange');

exports.amp = functions.https.onRequest(amp);
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

exports.deleteFile = functions.firestore.document('{collectionName}/{docName}')
  .onDelete((snap, context) => {
    return handleDbDataChange.onDelete(snap, context);
  })
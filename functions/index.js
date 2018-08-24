const functions = require('firebase-functions');
const app = require('./src/app');
const handleDbDataChange = require('./handleDbDataChange');

exports.app = functions.https.onRequest(app);

exports.createNewFile = functions.firestore.document('articles/{docName}')
  .onCreate((snap, context) => {
    return handleDbDataChange.onCreate(snap, context);
  })
const functions = require('firebase-functions');
const app = require('./src/app');
const handleDbDataChange = require('./handleDbDataChange');

const firebase = require('./src/firebase');
const db = firebase.db;

exports.app = functions.https.onRequest(app);

exports.createNewFile = functions.firestore.document('articles/{docName}')
  .onCreate((snap, context) => {
    return handleDbDataChange.onCreate(snap, context);
  })


//db.collection("articles").doc("article").get()
//  .then((doc) => {
//    const snap = doc.data();
//    const context = "context";
//    handleDbDataChange.onCreate(snap, context)
//    return;
//    })
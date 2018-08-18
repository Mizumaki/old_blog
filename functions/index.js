const functions = require('firebase-functions');
const app = require('./src/app');
const make = require('./src/buildHtml');

exports.app = functions.https.onRequest(app);

exports.make = functions.https.onRequest(make);
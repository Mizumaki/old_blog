const admin = require("firebase-admin");
admin.initializeApp();

module.exports = {
  storage: admin.storage(),
  db: admin.firestore()
}
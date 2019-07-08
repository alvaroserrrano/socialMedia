const admin = require("firebase-admin");

const serviceAccount = require("../socialape-44490-firebase-adminsdk-zadrb-b10b5af9a8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://socialape-44490.firebaseio.com"
});
// admin.initializeApp();

const db = admin.firestore();

module.exports = { admin, db };

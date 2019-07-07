const admin = require("firebase-admin");

const serviceAccount = require("/home/alvaro/Desktop/socialApe/socialape-44490-firebase-adminsdk-zadrb-8ce7573a7a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://socialape-44490.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };

const { admin, db } = require("./config");
module.exports = (req, res, next) => {
  let idToken;
  if ((req, headers.authorization && req.headers.startsWith)) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token was found");
    return res.status(403).json({ error: "Unauthorized" });
  }
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      return db
        .collection("users")
        .where("userId", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      req.user.handle = data.docs[0].data().handle;
      req.user.imageUrl = data.docs[0].data().imageUrl;
    })
    .catch((err) => {
      console.error("Error while verifying the token");
      return res.status(403).json(err);
    });
};

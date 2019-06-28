const { db } = require("../util/admin");

//fetch all screams
exports.getAllScreams = (req, res) => {
  db
    .collection("screams")
    .orderBy("createdAt", "desc")
    .get(),
    then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          userImage: doc.data().userImage
        });
      });
      return res.json(screams);
    }).catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//post one scream
exports.postOneScream = (req, res) => {
  if (req.body.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    userImage: req.body.imageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0
  };
  db.collection("screams")
    .add(newScream)
    .then((doc) => {
      const resScream = newScream;
      resScream.screamId = doc.id;
      res.json(resScream);
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong" });
      console.error(err);
    });
};

//get one scream
exports.getScream = (req, res) => {
  let screamData = {};
  db.doc("/screams/${req.params.screamId}")
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }
      screamData = doc.data();
    });
};

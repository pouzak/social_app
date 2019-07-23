const { db, admin } = require("../util/admin");
const firebase = require("firebase");
const config = require("../util/config");

//firebase serve
//firebase deploy

firebase.initializeApp(config);

const isEmpty = string => {
  if (string.trim() === "") {
    return true;
  } else return false;
};

const isEmail = email => {
  const regEx = /^(([^<>()\[\]\\.,;:\createdAt@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const reduceUserDetails = data => {
  let userDetails = {};
  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  if (!isEmpty(data.website.trim())) {
    if (data.website.trim().substring(0, 4) !== "http") {
      userDetails.website = `http://${data.website.trim()}`;
    } else {
      userDetails.website = data.website;
    }
  }
  if (!isEmpty(data.location.trim())) userDetails.location = data.location;
  return userDetails;
};

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };
  let token;
  let userId;
  let errors = {};

  if (isEmpty(newUser.email)) {
    errors.email = "Email must not be empty";
    console.log("Email must not be empty");
  } else if (!isEmail(newUser.email)) {
    errors.email = "Must be valid email";
    console.log("Must be valid email");
  }
  if (isEmpty(newUser.password)) errors.password = "Must not be empty";

  if (newUser.password !== newUser.confirmPassword)
    errors.confirmPassowrd = "Password must match";
  if (isEmpty(newUser.handle)) errors.handle = "Must not be empty";

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  const noImg = "profile-icon.png";

  db.doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if (doc.exist) {
        return res.status(400).json({ handle: "this handle already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
          config.storageBucket
        }/o/${noImg}?alt=media`,
        userId: userId
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "email allready in use" });
      } else {
        return res.status(500).json({ general: "Something wrong" });
      }
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  let errors = {};
  if (isEmpty(user.password)) errors.password = "Must not be empty";
  if (isEmpty(user.email)) errors.email = "Must not be empty";
  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({ token });
    })
    .catch(err => {
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-email"
      ) {
        return res.status(403).json({ general: "wrong credentials" });
      }
      return res.status(500).json({ error: err.code });
    });
};

// exports.uploadImage = (req, res) => {
//   const BusBoy = require("busboy");
//   const path = require("path");
//   const os = require("os");
//   const fs = require("fs");

//   const busboy = new BusBoy({ headers: req.headers });
//   let imageFileName;
//   let imageToBeUploaded = {};

//   busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
//     console.log(fieldname, filename, mimetype);
//     const imageExtension = filename.split(".")[filename.split(".") - 1];
//     imageFileName = `${Math.round(Math.random() * 1000)}.${imageExtension}`;
//     const filepath = path.join(os.tmpdir(), imageFileName);
//     imageToBeUploaded = { filepath, mimetype };
//     file.pipe(fs.createWriteStream(filepath));
//   });
//   busboy.on("finish", () => {
//     admin
//       .storage()
//       .bucket(`${config.storageBucket}`)
//       .upload(imageToBeUploaded.filepath, {
//         resumable: false,
//         metadata: {
//           metadata: {
//             contentType: imageToBeUploaded.mimetype
//           }
//         }
//       })
//       .then(() => {
//         const imageURL = `https://firebasestorage.googleapis.com/v0/b/${
//           config.storageBucket
//         }/o/${imageFileName}?alt=media`;
//         return db
//           .doc(`/users/${req.user.handle}`)
//           .update({
//             imageUrl: imageURL
//           })
//           .then(() => {
//             return res.json({ message: "Image uplaoaded succesfully" });
//           })
//           .catch(err => {
//             console.error(err);
//             return res.status(500).json({ error: err.code });
//           });
//       });
//   });
//   busboy.end(req.rawBody);
// };

exports.uploadImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket(`${config.storageBucket}`)
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype
          }
        }
      })
      .then(() => {
        const img = `https://firebasestorage.googleapis.com/v0/b/${
          config.storageBucket
        }/o/${imageFileName}?alt=media`;
        return db
          .doc(`/users/${req.user.userHandle}`)
          .update({ imageUrl: img });
      })
      .then(() => {
        return res.json({ message: "image uploaded successfully" });
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({ error: "something went wrong" });
      });
  });
  busboy.end(req.rawBody);
};

exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);

  db.doc(`/users/${req.user.userHandle}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: "Details updated successfully" });
    })
    .catch(err => {
      return res.status(500).json({ error: err.code });
    });
};

exports.getAuthenticatedUser = (req, res) => {
  let userData = {};

  db.doc(`/users/${req.user.userHandle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        userData.creadentials = doc.data();
        return db
          .collection("likes")
          .where("userHandle", "==", req.user.userHandle)
          .get();
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    })
    .then(data => {
      userData.likes = [];
      data.forEach(el => {
        userData.likes.push(el.data());
      });
      return res.json(userData);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getUserDetails = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.params.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        userData.user = doc.data();
        return db
          .collection("screams")
          .where("userHandle", "==", req.params.handle)
          .orderBy("createdAt", "desc")
          .get();
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    })
    .then(data => {
      userData.screams = [];
      data.forEach(doc => {
        userData.screams.push({
          body: doc.data().body,
          createdAt: doc.data().createdAt,
          userHandle: doc.data().userHandle,
          userImage: doc.data().userImage,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          screamId: doc.id
        });
      });
      return res.json(userData);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

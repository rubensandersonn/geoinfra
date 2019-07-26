import firebase from "firebase";
import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

// const config = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// };

const config = {
  apiKey: "AIzaSyAsOUy2nf6WCHgyyfI17ihZxaBY5H0tQQE",
  authDomain: "geoinfra2.firebaseapp.com",
  databaseURL: "https://geoinfra2.firebaseio.com",
  projectId: "geoinfra2",
  storageBucket: "geoinfra2.appspot.com",
  messagingSenderId: "96025426007",
  appId: "1:96025426007:web:55b1dcfa5a849d96"
};

String.prototype.hashCode = function() {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  doGetAllValidData = () => {};

  /**
   *
   * @param {int} index the index in network
   * @param {String} type agua, esgoto ou gas
   */
  doReadInterventions(index, type) {
    return new Promise(resolve => {
      this.db
        .ref(type + "/" + index + "/interventions")
        .once("value", function(snapshot) {
          resolve(snapshot.val());
        })
        .catch(err => {
          resolve(null);
          console.log(
            "(doReadInterventions) Erro ao buscar as intervenções: ",
            err
          );
        });
    });
  }

  doCreateIntervention(index, type, indexInterv, interv) {
    return new Promise(resolve => {
      this.db
        .ref(type + "/" + index + "/interventions/" + indexInterv)
        .push(interv)
        .then(result => {
          console.log("registro atualizado!");
          resolve(true);
        })
        .catch(err => {
          console.log("deu erro ao inserir intervenção:", err);
          resolve(false);
        });
    });
  }

  doDeleteIntervention(index, type, indexInterv) {
    return new Promise(resolve => {
      this.db
        .ref(type + "/" + index + "/interventions/" + indexInterv)
        .remove()
        .then(result => {
          console.log("registro removido!");
          resolve(true);
        })
        .catch(err => {
          console.log("deu erro ao remover intervenção:", err);
          resolve(false);
        });
    });
  }

  doUpdateIntervention(index, type, indexInterv, interv) {
    return new Promise(resolve => {
      this.db
        .ref(type + "/" + index + "/interventions")
        .child(indexInterv)
        .update(interv)
        .then(result => {
          console.log("intervenção atualizada");
          resolve(true);
        })

        .catch(error => {
          console.log("erro ao remover");
          resolve({
            errorCode: error.code,
            errorMessage: error.message
          });
        });
    });
  }
}

export default Firebase;

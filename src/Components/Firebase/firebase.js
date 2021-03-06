import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID
};

// String.prototype.hashCode = function() {
//   var hash = 0,
//     i,
//     chr;
//   if (this.length === 0) return hash;
//   for (i = 0; i < this.length; i++) {
//     chr = this.charCodeAt(i);
//     hash = (hash << 5) - hash + chr;
//     hash |= 0; // Convert to 32bit integer
//   }
//   return hash;
// };

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.st = app.storage();
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
        .ref(type + "/interventions/" + index)
        .once("value", function(snapshot) {
          console.log("(doRead) pegou do firebase:", snapshot.val());
          resolve(snapshot.val());
        })
        .catch(err => {
          resolve([]);
          console.log(
            "(doReadInterventions) Erro ao buscar as intervenções: ",
            err
          );
        });
    });
  }

  /**
   * Suponho que não há necessidade de remover intervenções, apenas adicionar novas.
   * As antigas só prescrevem.
   * @param {*} index
   * @param {*} interventions
   */
  doCreateIntervention(interventions, index) {
    let i = {};
    i[index] = interventions;

    return new Promise(resolve => {
      this.db
        .ref("interventions/" + interventions[0].endereco)
        .set(interventions)
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

  doDeleteIntervention(interventions, endereco) {
    return new Promise((resolve, reject) => {
      this.db
        .ref("interventions/" + endereco)
        .set(interventions)
        .then(result => {
          console.log("(delete) registro atualizado!");
          resolve(true);
        })
        .catch(err => {
          console.log("(delete) deu erro ao inserir intervenção:", err);
          reject(err);
        });
    });
  }

  doUpdateIntervention(interventions, index) {
    let i = {};
    i[index] = interventions;

    return new Promise(resolve => {
      this.db
        .ref("interventions/" + interventions[0].endereco)
        .set(interventions)
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

  doCreateRedeAgua(agua) {
    return new Promise(resolve => {
      this.db
        .ref("agua")
        .set({rede: agua})
        .then(result => {
          console.log("rede agua cadastrada!");
          resolve(true);
        })
        .catch(err => {
          console.log("erro ao criar rede agua:", err);
          resolve(false);
        });
    });
  }

  doCreateRedeEsgoto(esgoto) {
    return new Promise(resolve => {
      this.db
        .ref("esgoto")
        .set({rede: esgoto})
        .then(result => {
          console.log("rede esgoto cadastrada!");
          resolve(true);
        })
        .catch(err => {
          console.log("erro ao criar rede esgoto:", err);
          resolve(false);
        });
    });
  }

  doCreateRedeGas(gas) {
    return new Promise(resolve => {
      this.db
        .ref("gas")
        .set({rede: gas})
        .then(result => {
          console.log("rede gas cadastrada!");
          resolve(true);
        })
        .catch(err => {
          console.log("erro ao criar rede gas:", err);
          resolve(false);
        });
    });
  }

  doCreateUpdaterAgua() {
    const asma = {asma: "nia de daocu"};
    return new Promise(resolve => {
      const reff = this.db.ref("agua/update");

      reff
        .set(asma)
        .then(result => {
          console.log("update agua criado!");
          resolve(true);
        })
        .catch(err => {
          console.log("deu erro ao inserir update:", err);
          resolve(false);
        });
    });
  }
  doCreateUpdaterGas() {
    const asma = {asma: "nia de daocu"};
    return new Promise(resolve => {
      const reff = this.db.ref("gas/update");

      reff
        .set(asma)
        .then(result => {
          console.log("update gas criado!");
          resolve(true);
        })
        .catch(err => {
          console.log("deu erro ao inserir update:", err);
          resolve(false);
        });
    });
  }
  doCreateUpdaterEsgoto() {
    const asma = {asma: "nia de daocu"};
    return new Promise(resolve => {
      const reff = this.db.ref("esgoto/update");

      reff
        .set(asma)
        .then(result => {
          console.log("update esgoto criado!");
          resolve(true);
        })
        .catch(err => {
          console.log("deu erro ao inserir update:", err);
          resolve(false);
        });
    });
  }

  getRef() {
    return this.st.ref("redes");
  }

  // === refs ===

  getRefAgua() {
    return this.db.ref("agua/rede");
  }
  getRefGas() {
    return this.db.ref("gas/rede");
  }
  getRefEsgoto() {
    return this.db.ref("esgoto/rede");
  }
  getRefViario() {
    return this.db.ref("viario/rede");
  }
  getRefDB(type) {
    return this.db.ref(type + "/update");
  }

  getIntervRef(type) {
    return this.db.ref(type + "/interventions");
  }

  getRefInterventions() {
    return this.db.ref("interventions");
  }

  // === useless ===

  updateChanger(type) {
    const asma = {asma: Date.now()};
    return new Promise(resolve => {
      const reff = this.db.ref(type + "/update");

      reff
        .set(asma)
        .then(result => {
          console.log("updated successfull!");
          resolve(true);
        })
        .catch(err => {
          console.log("deu erro ao inserir update:", err);
          resolve(false);
        });
    });
  }
}

export default Firebase;

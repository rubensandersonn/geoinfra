import React from "react";

import {withFirebase} from "../Components/Firebase";

const SignOutButton = ({firebase}) => (
  <a href="sair">
    <div
      className="toggle-button d-flex btn btn-primary"
      onClick={e => {
        e.preventDefault();
        firebase.doSignOut();
      }}
    >
      <img
        alt="sign out icon"
        style={{maxHeight: 25}}
        src={require("../utils/images/signOut2.png")}
      />
    </div>
  </a>
);

export default withFirebase(SignOutButton);

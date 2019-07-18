import React from "react";

import {withFirebase} from "../Components/Firebase";

const SignOutButton = ({firebase}) => (
  <a href="sign out">
    <div
      className="toggle-button d-flex btn btn-primary"
      onClick={firebase.doSignOut}
    >
      Sign Out
    </div>
  </a>
);

export default withFirebase(SignOutButton);

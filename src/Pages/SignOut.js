import React from "react";

import { withFirebase } from "../Components/Firebase";

const SignOutButton = ({ firebase }) => (
  <div
    className="toggle-button d-flex btn btn-primary"
    onClick={firebase.doSignOut}
  >
    <a href="sign out">Sign Out</a>
  </div>
);

export default withFirebase(SignOutButton);

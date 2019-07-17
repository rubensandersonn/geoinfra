import React from "react";

import { AuthUserContext, withAuthorization } from "../Components/Session";
// import { PasswordForgetForm } from '../PasswordForget';
// import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className="container mt-4">
        <h3>Conta Atual: {authUser.email}</h3>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);

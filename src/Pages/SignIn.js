import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {compose} from "recompose";

import {SignUpLink} from "./SignUp";
import {withFirebase} from "../Components/Firebase";
import * as ROUTES from "../Routes";

const SignInPage = () => (
  <div className="container col-lg-7 mt-4">
    <h3>Fazer Login</h3>
    <SignInForm />
    <div className="col-lg-10 ml-auto">{/* <SignUpLink /> */}</div>
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    const {email, password} = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({...INITIAL_STATE});
        this.props.history.push(ROUTES.ABOUT);
      })
      .catch(error => {
        this.setState({error});
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const {email, password, error} = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <div className="container mt-4" role="document">
          <div className="form-group row ">
            <div className="col-lg-8">
              <input
                name="email"
                type="text"
                className="form-control border"
                placeholder="Email"
                value={email}
                onChange={this.onChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <input
                name="password"
                type="password"
                className="form-control border"
                placeholder="Password"
                value={password}
                onChange={this.onChange}
              />
            </div>
          </div>

          <div className="form-group col-lg-8 row">
            <div className="mt-4 ml-4 ml-auto">
              <input
                type="submit"
                disabled={isInvalid}
                className="btn btn-secondary text-white py-3 px-5"
                value="Sign In"
              />
            </div>
          </div>

          {error && <p className="text-danger">{error.message}</p>}
        </div>
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export {SignInForm};

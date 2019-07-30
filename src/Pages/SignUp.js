import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {compose} from "recompose";

import {withFirebase} from "../Components/Firebase";
import * as ROUTES from "../Routes";

const SignUpPage = () => (
  <div className="container col-lg-7 mt-4">
    <h3>Cadastrar Usuário</h3>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit = event => {
    const {username, email, passwordOne} = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email
        });
      })
      .then(() => {
        this.setState({...INITIAL_STATE});
        this.props.history.push(ROUTES.ABOUT);
      })
      .catch(error => {
        this.setState({error});
      });

    event.preventDefault();
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <div className="container mt-4">
          <div className="form-group row ">
            <div className="col-lg-8">
              <input
                name="username"
                value={username}
                className="form-control border"
                onChange={this.onChange}
                type="text"
                placeholder="Full Name"
              />
            </div>
          </div>
          <div className="form-group row ">
            <div className="col-lg-8">
              <input
                name="email"
                value={email}
                className="form-control border"
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
            </div>
          </div>
          <div className="form-group row ">
            <div className="col-lg-8">
              <input
                name="passwordOne"
                value={passwordOne}
                className="form-control border"
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="form-group row ">
            <div className="col-lg-8">
              <input
                name="passwordTwo"
                value={passwordTwo}
                className="form-control border"
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div className="form-group col-lg-8 row">
            <div className="mt-4 ml-4  ml-auto">
              <input
                type="submit"
                disabled={isInvalid}
                className="btn btn-block btn-secondary text-white py-3 px-5"
                value="Sign Up"
              />
            </div>
          </div>

          {error && <p className="black-text">{error.message}</p>}
        </div>
      </form>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

const SignUpLink = () => (
  <p className="text-black">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpPage;

export {SignUpForm, SignUpLink};

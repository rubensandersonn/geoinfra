import React from "react";

import "./App.css";
import {BrowserRouter as Router, Route} from "react-router-dom";

import MapHandler from "./Pages/Mapp/MapHandler";
import Navigation from "./Components/Navigation";
import SignUpPage from "./Pages/SignUp";
import SignInPage from "./Pages/SignIn";

import AboutPage from "./Pages/AboutPage";
import AccountPage from "./Pages/AccountPage";
import AdminPage from "./Pages/AdminPage";

import * as ROUTES from "./Routes";
import withAuthentication from "./Components/Session/withAuthentication";
import Filer from "./Components/Filer";

const App = () => (
  <Router>
    <div>
      <Navigation />

      <Route exact path={ROUTES.MAP} component={MapHandler} />
      <Route exact path={ROUTES.UPLOAD} component={Filer} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />

      <Route path={ROUTES.ABOUT} component={AboutPage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
);

export default withAuthentication(App);

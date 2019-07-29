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
import Upload from "./Components/Upload";

const Menu1 = () => (
  <div>
    <u>Menu 1 View</u>
  </div>
);
const Menu2 = () => (
  <div>
    <i>Menu 2 View</i>
  </div>
);
const SubMenu = () => (
  <div>
    <s>SubMenu View</s>
  </div>
);

const App = () => (
  <Router>
    <div>
      <Navigation />

      <Route exact path={ROUTES.MAP} component={MapHandler} />
      <Route exact path={ROUTES.UPLOAD} component={Upload} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />

      <Route path={ROUTES.ABOUT} component={AboutPage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
);

export default withAuthentication(App);

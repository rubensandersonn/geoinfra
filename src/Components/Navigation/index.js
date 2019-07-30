import React from "react";
import {Link} from "react-router-dom";

import SignOutButton from "../../Pages/SignOut";
import * as ROUTES from "../../Routes";

import {AuthUserContext} from "../Session";

/**
 * Aqui eu posso colocar os niveis de autenticação retornando a rota certa
 */
const Navigation = () => (
  <div className="site-navbar bg-blue pr-4">
    <div className="col-12">
      <nav className="site-navigation text-left " role="navigation">
        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle" />
            </div>
          </div>
          <div className="site-mobile-menu-body" />
        </div>

        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? (
              authUser.email === "rubens@gmail.com" ||
              authUser.email === "prefeitura@gmail.com" ? (
                <NavigationAuth authority={"prefeitura"} />
              ) : authUser.email === "cagece" ? (
                <NavigationAuth authority={"cagece"} />
              ) : (
                <NavigationAuth authority={"cegas"} />
              )
            ) : (
              <NavigationNonAuth />
            )
          }
        </AuthUserContext.Consumer>
      </nav>
    </div>
  </div>
);

const NavigationNonAuth = () => (
  <div className="row">
    <div>
      <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
        <li className="nav-link">
          <div>
            <a href={ROUTES.MAP}>Mapa</a>
          </div>
        </li>
        <li className="nav-link">
          <div>
            <a href={ROUTES.ABOUT}>Sobre</a>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <Link to={ROUTES.SIGN_IN}>
        <div className="toggle-button d-flex btn btn-primary mr-4">
          Sign In
        </div>
      </Link>
    </div>
  </div>
);

const NavigationAuth = props => (
  <div className="row">
    <div>
      <ul className="site-menu main-menu js-clone-nav ml-auto d-none d-lg-block">
        <li className="nav-link">
          <div>
            <a href={ROUTES.MAP}>Mapa</a>
          </div>
        </li>
        <li className="nav-link">
          <div>
            <a href={ROUTES.UPLOAD}>Upload</a>
          </div>
        </li>
        <li className="nav-link">
          <div>
            <a href={ROUTES.ABOUT}>Sobre</a>
          </div>
        </li>
        <li className="nav-link">
          <div>
            <a href={ROUTES.ACCOUNT}>Conta</a>
          </div>
        </li>
        {/* <li className="nav-link">
          <a href="admin">
            <Link authority={props.authority} to={ROUTES.ADMIN}>
              Admin
            </Link>
          </a>
        </li> */}
      </ul>
    </div>
    <div className="mr-4">
      <SignOutButton />
    </div>
  </div>
);

export default Navigation;

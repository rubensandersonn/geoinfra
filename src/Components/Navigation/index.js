import React from "react";
import {Link} from "react-router-dom";

import SignOutButton from "../../Pages/SignOut";
import * as ROUTES from "../../Routes";

import {AuthUserContext} from "../Session";

/**
 * Aqui eu posso colocar os niveis de autenticação retornando Link rota certa
 */
const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-blue p-4">
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
);

const NavigationNonAuth = props => (
  <div className="collapse navbar-collapse">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <div>
          <Link className="nav-link" to={ROUTES.MAP}>
            <span style={{color: "#ffe"}}>Mapa</span>{" "}
          </Link>
        </div>
      </li>

      <li className="nav-item">
        <div>
          <Link className="nav-link" to={ROUTES.ABOUT}>
            <span style={{color: "#ffe"}}>Sobre</span>{" "}
          </Link>
        </div>
      </li>
    </ul>

    <div className="form-inline my-2 my-lg-0">
      <Link to={ROUTES.SIGN_IN}>
        <div
          style={{color: "#ffe"}}
          className="toggle-button d-flex btn btn-primary mr-4"
        >
          <img
            alt="icone sign in"
            style={{maxHeight: 25}}
            src={require("../../utils/images/signIn.png")}
          />
        </div>
      </Link>
    </div>
  </div>
);

const NavigationAuth = props => (
  <div className="collapse navbar-collapse">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <div>
          <Link className="nav-link" to={ROUTES.MAP}>
            <span style={{color: "#ffe"}}>Mapa</span>{" "}
          </Link>
        </div>
      </li>
      <li className="nav-item">
        <div>
          <Link className="nav-link" to={ROUTES.UPLOAD}>
            <span style={{color: "#ffe"}}>Upload</span>{" "}
          </Link>
        </div>
      </li>
      <li className="nav-item">
        <div>
          <Link className="nav-link" to={ROUTES.ABOUT}>
            <span style={{color: "#ffe"}}>Sobre</span>{" "}
          </Link>
        </div>
      </li>
      <li className="nav-item">
        <div>
          <Link className="nav-link" to={ROUTES.ACCOUNT}>
            <span style={{color: "#ffe"}}>Conta</span>{" "}
          </Link>
        </div>
      </li>
      {/* <li >
          <Link to className="nav-link"="admin">
            <Link authority={props.authority} to={ROUTES.ADMIN}><span style={{color: "#ffe"}}></span> 
              Admin
            </Link>
          </Link>
        </li> */}
    </ul>

    <div className="form-inline my-2 my-lg-0">
      <SignOutButton />
    </div>
  </div>
);

export default Navigation;

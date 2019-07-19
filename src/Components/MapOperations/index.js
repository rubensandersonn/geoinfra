import React from "react";

import {AuthUserContext} from "../Session";
import CadForm from "../Forms/CadForm";
import Modall from "../Modall";

/**
 * Aqui eu posso colocar os niveis de autenticação retornando a rota certa
 */

const content = title => {
  return (
    <CadForm title={title} onSubmit={e => console.log("xamu", e)} />
  );
};

const MapOperations = () => {
  function toggleMenu() {
    var x = document.getElementById("navv");
    if (x.style.display === "none") {
      x.style.display = "inline";
    } else {
      x.style.display = "none";
    }
  }

  return (
    <div
      style={{backgroundColor: "#232323"}}
      className="site-navbar pr-4"
    >
      <div className=" align-items-left position-relative">
        <div
          onClick={toggleMenu}
          className="toggle-button d-flex btn btn-primary mr-4"
        >
          ...
        </div>
        <nav
          id="navv"
          style={{display: "none"}}
          className="site-navigation text-left "
          role="navigation"
        >
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
                authUser.email === "rubens@gmail.com" ? (
                  <NavigationRubens />
                ) : authUser.email === "cagece@gmail.com" ? (
                  <NavigationCagece />
                ) : (
                  <NavigationCegas />
                )
              ) : (
                <NavigationNull />
              )
            }
          </AuthUserContext.Consumer>
        </nav>
      </div>
    </div>
  );
};

const NavigationNull = () => <div />;

const NavigationCegas = () => (
  <div className="row">
    <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
      <li className="nav-link">
        <Modall
          buttonValue={"Cadastrar Intervenção CEGAS"}
          content={() => content("Cadastrar Intervenção CEGAS")}
        />
      </li>
      <li className="nav-link">
        <Modall
          buttonValue={"Atualizar Intervenção CEGAS"}
          content={() => content("Atualizar Intervenção CEGAS")}
        />
      </li>
    </ul>
  </div>
);

const NavigationCagece = () => (
  <div className="row">
    <div>
      <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
        <li className="nav-link">
          <Modall
            buttonValue={"Cadastrar Intervenção CAGECE"}
            content={() => content("Cadastrar Intervenção CAGECE")}
          />
        </li>
        <li className="nav-link">
          <Modall
            buttonValue={"Atualizar Intervenção CAGECE"}
            content={() => content("Atualizar Intervenção CAGECE")}
          />
        </li>
      </ul>
    </div>
  </div>
);

const NavigationRubens = () => (
  <div className="row">
    <div>
      <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
        <li className="nav-link">
          <Modall
            buttonValue={"Cadastrar Intervenção CAGECE"}
            content={() => content("Cadastrar Intervenção CAGECE")}
          />
        </li>
        <li className="nav-link">
          <Modall
            buttonValue={"Atualizar Intervenção CAGECE"}
            content={() => content("Atualizar Intervenção CAGECE")}
          />
        </li>
        <li className="nav-link">
          <Modall
            buttonValue={"Cadastrar Intervenção CEGAS"}
            content={() => content("Cadastrar Intervenção CEGAS")}
          />
        </li>
        <li className="nav-link">
          <Modall
            buttonValue={"Atualizar Intervenção CEGAS"}
            content={() => content("Atualizar Intervenção CEGAS")}
          />
        </li>
      </ul>
    </div>
  </div>
);

export default MapOperations;

import React from "react";
import Create from "./create";
import Update from "./Update";
import Delete from "./Delete";
import ReadInfo from "./ReadInfo";

// import { Container } from './styles';

const Manager = props => {
  const types = {
    create: "CREATE",
    delete: "DELETE",
    update: "UPDATE"
  };
  let active = types.create;

  useEffect(() => {
    switch (active) {
      case types.create:
        break;
      default:
    }
  }, [active]);

  const resetAll = () => {
    activeCreate = activeDelete = activeUpdate = false;
  };

  return (
    <div>
      <div>INTERVENÇÕES</div>
      {/* NAVBAR */}
      <div className=" align-items-left position-relative">
        <nav
          id="navv"
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
          <div className="row">
            <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
              <li
                onClick={() => (active = types.create)}
                className="nav-link"
              >
                <a href="cadastrar">Cadastrar</a>
              </li>
              <li
                onClick={() => (active = types.update)}
                className="nav-link"
              >
                <a href="cadastrar">Atualizar</a>
              </li>
              <li
                onClick={() => (active = types.delete)}
                className="nav-link"
              >
                <a href="cadastrar">Remover</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {/* CORPO */}
      <div>
        <ReadInfo />
      </div>
      <div id="create">
        <Create />
      </div>
      <div id="update">
        <Update />
      </div>
      <div id="delete">
        <Delete />
      </div>
    </div>
  );
};

//-----------------------------------------------------

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

export default Manager;

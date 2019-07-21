import React, {useEffect, useContext} from "react";
import Create from "./create";
import Update from "./Update";
import Delete from "./Delete";
import ReadInfo from "./ReadInfo";
import EsgotoContext from "../../Context/esgotoContext";
import AguaContext from "../../Context/aguaContext";

const types = {
  create: "CREATE",
  delete: "DELETE",
  update: "UPDATE"
};

const Manager = props => {
  let el;
  let setter;

  useEffect(() => {
    el =
      type === "agua"
        ? agua[key]
        : type === "esgoto"
        ? esgoto[key]
        : gas[key];

    setter =
      type === "agua"
        ? setAgua
        : type === "esgoto"
        ? setEsgoto
        : setGas;
  }, []); // faz isso uma vez só

  let active = types.create;

  // ========== CONTEXTS ==========

  const {esgoto, setEsgoto} = useContext(EsgotoContext);
  const {agua, setAgua} = useContext(AguaContext);
  const {gas, setGas} = useContext(AguaContext);

  const {key, type} = props; // preciso saber quais dados eu posso mostrar. type pode ser agua, gas ou esgoto

  useEffect(() => {
    switch (active) {
      case types.create:
        break;
      default:
    }
  }, [active]);

  // ========== CALLBACKS =============

  const onSubmit = values => {
    if (el.properties.intervention) {
      el.properties.interventions.push(values);
      //setter(state => (state[key] = el));
    } else {
      el.properties.interventions = [values];
    }
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
        <ReadInfo item={el} />
      </div>
      <div id="create">
        <Create onSubmit={onSubmit} />
      </div>
      <div id="update">
        <Update key onSubmit={onSubmit} />
      </div>
      <div id="delete">
        <Delete onSubmit={onSubmit} />
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

import React, {useEffect, useContext, useState} from "react";
import Create from "./Create";
import Update from "./Update";
import Delete from "./Delete";
import ReadInfo from "./ReadInfo";

const types = {
  create: "CREATE",
  delete: "DELETE",
  update: "UPDATE"
};

const Manager = props => {
  // === === === CONTEXTS === === ===

  //=== === === PROPS === === ===

  const {key, type, redAgua, redEsgoto, redGas, authority} = props; // preciso saber quais dados eu posso mostrar. type pode ser agua, gas ou esgoto
  const {agua, dispatchAgua} = redAgua;
  const {esgoto, dispatchEsgoto} = redEsgoto;
  const {gas, dispatchGas} = redGas;
  const [el, setEl] = useState();

  //=== === === Callbacks === === ===

  useEffect(() => {
    setEl(
      type === "agua"
        ? agua[key]
        : type === "esgoto"
        ? esgoto[key]
        : gas[key]
    );
  }, []); // faz isso uma vez só

  let active = types.create;

  useEffect(() => {
    switch (active) {
      case types.create:
        // mostrar pelo id
        document.getElementById("update").style.display = "none";
        document.getElementById("delete").style.display = "none";
        document.getElementById("create").style.display = "block";
        break;
      case types.update:
        // mostrar pelo id
        document.getElementById("create").style.display = "none";
        document.getElementById("delete").style.display = "none";
        document.getElementById("update").style.display = "block";
        break;
      case types.delete:
        // mostrar pelo id
        document.getElementById("create").style.display = "none";
        document.getElementById("update").style.display = "none";
        document.getElementById("delete").style.display = "block";
        break;
      default:
        document.getElementById("update").style.display = "none";
        document.getElementById("delete").style.display = "none";
        document.getElementById("create").style.display = "block";
        break;
    }
  }, [active]);

  // ========== CALLBACKS =============

  const onSubmit = values => {
    // if (el.properties.intervention) {
    //   el.properties.interventions.push(values);
    //   //setter(state => (state[key] = el));
    // } else {
    //   el.properties.interventions = [values];
    // }
    console.log("submited ", values);
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
                <a href="atualizar">Atualizar</a>
              </li>
              <li
                onClick={() => (active = types.delete)}
                className="nav-link"
              >
                <a href="remover">Remover</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {/* CORPO */}
      <div className="container row">
        <div>
          <ReadInfo properties={el.properties} />
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
    </div>
  );
};

//-----------------------------------------------------

export default Manager;

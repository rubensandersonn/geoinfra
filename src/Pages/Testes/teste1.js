import React from "react";
import Create from "../../Components/Manager/Create";
import Delete from "../../Components/Manager/Delete";
import Update from "../../Components/Manager/Update";

// import { Container } from './styles';

const teste1 = props => {
  const {agua, type, key} = props;

  const pretifyWindow = value => {
    const mapp = Object.keys(value).map(key => {
      if (!key.match(/id|x|y/gm)) {
        return (
          <p className="text-black">
            <span style={{fontWeight: "bold"}}>
              {key.replace(/_/gm, " ")}
            </span>
            {": "}
            {key === "em_operacao"
              ? value[key]
                ? "SIM"
                : "NÃO"
              : value[key]}
          </p>
        );
      }
      return null;
    });

    return mapp;
  };

  const buttonClicked = who => {
    let divv;
    switch (who) {
      case "cadastrar": {
        divv = "cadastrar";
        break;
      }
      case "atualizar": {
        divv = "atualizar";
        break;
      }
      case "remover": {
        divv = "remover";
        break;
      }
      default: {
        console.log("erro no button clicked");
        break;
      }
    }

    document.getElementById("cadastrar").style.display = "none";
    document.getElementById("atualizar").style.display = "none";
    document.getElementById("remover").style.display = "none";
    document.getElementById(divv).style.display = "block";
    document.getElementById("titulo").innerHTML =
      divv.charAt(0).toUpperCase() + divv.slice(1) + " Intervenção";
  };

  return (
    <>
      <div class="">
        <div className="col-lg-12 text-center mb-4">
          <div className="block-heading-1">
            <h2 id="titulo">Cadastrar Intervenção</h2>
          </div>
          <div className="border-bottom rounded p-2 m-2">
            <div
              className="btn btn-secondary ml-2 mr-2 pl-2 pr-2"
              onClick={() => buttonClicked("cadastrar")}
            >
              Criar
            </div>
            <div
              className="btn btn-secondary ml-2 mr-2 pl-2 pr-2"
              onClick={() => buttonClicked("atualizar")}
            >
              Atualizar
            </div>
            <div
              className="btn btn-secondary ml-2 mr-2 pl-2 pr-2"
              onClick={() => buttonClicked("remover")}
            >
              Remover
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 border-right ml-auto">
          <p>
            {agua[key]
              ? pretifyWindow(agua[key].properties)
              : agua[key]}
          </p>
        </div>
        <div id="cadastrar" className="col-lg-6 mb-5">
          <Create onSubmit={e => console.log("submeteu", e)} />
        </div>
        <div
          id="atualizar"
          style={{display: "none"}}
          className="col-lg-6 mb-5"
        >
          <Update />
        </div>
        <div
          id="remover"
          style={{display: "none"}}
          className="col-lg-6 mb-5"
        >
          <Delete interventions={[1, 2, 3, 4, 5]} />
        </div>
      </div>
    </>
  );
};

export default teste1;

import React from "react";
import Create from "../../Components/Manager/Create";
import Delete from "../../Components/Manager/Delete";
import Update from "../../Components/Manager/Update";

// import { Container } from './styles';

const teste2 = props => {
  const {type, key, reducerRede} = props;

  const {rede, dispatch, authority} = reducerRede;

  const submitUpdate = (obj, indexInterv) => {
    console.log("submited update: ", obj, indexInterv);
    obj.responsable = authority;
    dispatch({
      type: "update-intervention",
      value: obj,
      index: key,
      indexInterv
    });
  };

  const submitCreate = obj => {
    console.log("submited create: ", obj);
    obj.responsable = authority;
    dispatch({type: "create-intervention", value: obj, index: key});
  };

  const submitDelete = indexInterv => {
    console.log("submited delete: ", indexInterv);

    dispatch({
      type: "delete-intervention",
      index: key,
      indexInterv
    });
  };

  const pretifyWindow = value => {
    const mapp = Object.keys(value).map(key => {
      // if (!key.match(/id|x|y/gm)) {
      if (true) {
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
            {rede[key]
              ? pretifyWindow(rede[key].properties)
              : rede[key]}
          </p>
          <p>
            {rede[key] ? rede[key].geometry.coordinates : rede[key]}
          </p>
        </div>
        <div id="cadastrar" className="col-lg-6 mb-5">
          <Create onSubmit={obj => submitCreate(obj)} />
        </div>
        <div
          id="atualizar"
          style={{display: "none"}}
          className="col-lg-6 mb-5"
        >
          <Update
            interventions={rede.properties.interventions}
            onSubmit={(obj, indexInterv) =>
              submitUpdate(obj, indexInterv)
            }
          />
        </div>
        <div
          id="remover"
          style={{display: "none"}}
          className="col-lg-6 mb-5"
        >
          <Delete
            interventions={rede.properties.interventions}
            onSubmit={indexInterv => submitDelete(key, indexInterv)}
          />
        </div>
      </div>
    </>
  );
};

export default teste2;

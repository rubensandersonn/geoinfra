import React from "react";
import Create from "../../Components/Manager/Create";
import Delete from "../../Components/Manager/Delete";

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
      case "create": {
        divv = "create";
        break;
      }
      case "update": {
        divv = "update";
        break;
      }
      case "delete": {
        divv = "delete";
        break;
      }
      default: {
        console.log("erro no button clicked");
        break;
      }
    }

    document.getElementById("create").style.display = "none";
    document.getElementById("update").style.display = "none";
    document.getElementById("delete").style.display = "none";
    document.getElementById(divv).style.display = "block";
  };

  return (
    <>
      <div class="row">
        <div className="col-lg-12 text-center mb-4">
          <div className="block-heading-1">
            <h2>Cadastrar</h2>
          </div>
        </div>
      </div>

      <button onClick={() => buttonClicked("create")}>Create</button>
      <button onClick={() => buttonClicked("update")}>Update</button>
      <button onClick={() => buttonClicked("delete")}>Delete</button>

      <div className="row">
        <div className="col-lg-6 border-right ml-auto">
          <p>
            {agua[key]
              ? pretifyWindow(agua[key].properties)
              : agua[key]}
          </p>
        </div>
        <div id="create" className="col-lg-6 mb-5">
          <Create onSubmit={e => console.log("submeteu", e)} />
        </div>
        <div id="update" display="none" className="col-lg-6 mb-5">
          <p>UPDATE</p>
        </div>
        <div id="delete" display="none" className="col-lg-6 mb-5">
          <Delete interventions={[1, 2, 3, 4, 5]} />
        </div>
      </div>
    </>
  );
};

export default teste1;

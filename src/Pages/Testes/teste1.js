import React from "react";
import Create from "../../Components/Manager/Create";

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

  return (
    <>
      <div class="row">
        <div className="col-lg-12 text-center mb-4">
          <div className="block-heading-1">
            <h2>Cadastrar</h2>
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
        <div className="col-lg-6 mb-5">
          <Create onSubmit={e => console.log("submeteu", e)} />
        </div>
      </div>
    </>
  );
};

export default teste1;

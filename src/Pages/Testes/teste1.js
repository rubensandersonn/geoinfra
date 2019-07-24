import React from "react";

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
        <div className="col-12 text-center mb-5">
          <div className="block-heading-1">
            <h2>Cadastrar</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 mr-auto">
          <p>
            {agua[key]
              ? pretifyWindow(agua[key].properties)
              : agua[key]}
          </p>
        </div>
        <div className="col-lg-4 mb-5">
          <p>as mania de da o cu</p>
        </div>
      </div>
    </>
  );
};

export default teste1;

import React from "react";

// import { Container } from './styles';

const teste1 = props => {
  const {agua, type, key} = props;

  const pretifyWindow = value => {
    const mapp = Object.keys(value).map(key => {
      if (!key.match(/id|x|y/gm)) {
        return (
          <div key className="row container">
            <span style={{fontWeight: "bold"}}>
              {key.replace(/_/gm, " ")}
            </span>
            {": "}
            {key === "em_operacao"
              ? value[key]
                ? "SIM"
                : "NÃO"
              : value[key]}
          </div>
        );
      }
      return null;
    });

    return mapp;
  };

  return (
    <>
      <div className="row">
        {agua[key] ? pretifyWindow(agua[key].properties) : agua[key]}
      </div>
    </>
  );
};

export default teste1;

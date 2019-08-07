import React from "react";

// import { Container } from './styles';

export default function Legend() {
  return (
    <div>
      <h3>Legenda</h3>
      <div>
        <img src={require("../../utils/images/squareBlue.png")} />{" "}
        REDE ÁGUA{" "}
      </div>
      <div>
        <img src={require("../../utils/images/squareOrange.png")} />{" "}
        REDE GÁS{" "}
      </div>
      <div>
        <img src={require("../../utils/images/squareGreen.png")} />{" "}
        REDE ESGOTO{" "}
      </div>
      <div>
        <img src={require("../../utils/images/flagCagece.png")} />{" "}
        Intervenções CAGECE{" "}
      </div>
      <div>
        <img src={require("../../utils/images/flagCegas.png")} />{" "}
        Intervenções CEGAS{" "}
      </div>
      <div>
        <img src={require("../../utils/images/flagPrefeitura.png")} />{" "}
        Intervenções PREFEITURA{" "}
      </div>
    </div>
  );
}

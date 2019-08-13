import React from "react";

// import { Container } from './styles';

export default function Legend() {
  return (
    <div>
      <div style={{minWidth: 240}}>
        <div className="font-weight-bold">
          <h6>LEGENDA</h6>
        </div>
        <div>
          <img src={require("../../utils/images/squareBlue.png")} />{" "}
          Rede de Distr. de Água
        </div>
        <div>
          <img src={require("../../utils/images/squareOrange.png")} />{" "}
          Rede de Distr. de Gás Natural
        </div>
        <div>
          <img src={require("../../utils/images/squareGreen.png")} />{" "}
          Rede Coletora de Esgoto
        </div>
        <div>
          <img src={require("../../utils/images/squareGray.png")} />{" "}
          Rede de Sistema Viário
        </div>
        <div>
          <img src={require("../../utils/images/flagBlue.png")} />{" "}
          Interv. Rede de Distr. de Água
        </div>
        <div>
          <img src={require("../../utils/images/flagOrange.png")} />{" "}
          Interv. Rede de Distr. de Gás Natural
        </div>
        <div>
          <img src={require("../../utils/images/flagGreen.png")} />{" "}
          Interv. Rede Coletora de Esgoto
        </div>
        <div>
          <img src={require("../../utils/images/flagOrange.png")} />{" "}
          Interv. Rede de Sistema Viário
        </div>
        <div>
          <img src={require("../../utils/images/squareSea.png")} />{" "}
          Oceano
        </div>
      </div>
    </div>
    //
  );
}

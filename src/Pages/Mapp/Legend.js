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
        <img src={require("../../utils/images/flagBlue.png")} />{" "}
        INTERV. REDE ÁGUA
      </div>
      <div>
        <img src={require("../../utils/images/flagGreen.png")} />{" "}
        INTERV. REDE ESGOTO
      </div>
      <div>
        <img src={require("../../utils/images/flagOrange.png")} />{" "}
        INTERV. REDE GÁS
      </div>
    </div>
    //
  );
}

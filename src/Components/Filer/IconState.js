import React from "react";
import "./style.css";
// import { Container } from './styles';

export default function IconState(props) {
  const {state} = props;
  return (
    <div>
      {state.status === "OK" ? (
        <div>
          <img
            alt="okIcon"
            className="iconOk"
            src={require("../../utils/images/ok.png")}
          />{" "}
          Arquivo {state.image} Processado
        </div>
      ) : state.status === "WAITING" ? (
        <div>
          <img
            alt="iconWait"
            className="spinning"
            src={require("../../utils/images/wait.png")}
          />{" "}
          Processando Arquivo {state.image}...
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

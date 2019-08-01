import React, {useContext} from "react";
import FilerAgua from "./FilerAgua";
import FilerEsgoto from "./FilerEsgoto";
import FilerGas from "./FilerGas";

import {AuthUserContext} from "../Session";

// import { Container } from './styles';

export default function Filer(props) {
  return (
    <div className="container mt-4">
      <h3>Fazer Upload de Arquivos da Rede</h3>

      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            authUser.email === "rubens@gmail.com" ||
            authUser.email === "prefeitura@gmail.com" ? (
              <div>
                {/* prefeitura */}
                <FilerAgua />
                <FilerEsgoto />
                <FilerGas />
              </div>
            ) : authUser.email === "cagece@gmail.com" ? (
              <div>
                {/* cagece */}
                <FilerAgua />
                <FilerEsgoto />
              </div>
            ) : (
              <div>
                {/* cegas */}
                <FilerGas />
              </div>
            )
          ) : (
            "none"
          )
        }
      </AuthUserContext.Consumer>
    </div>
  );
}

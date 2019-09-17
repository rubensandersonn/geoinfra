import React from "react";
import Uploader from "./Uploader";

import {AuthUserContext} from "../Session";

// import { Container } from './styles';

export default function Filer(props) {
  return (
    <div className="container mt-4">
      <h3 style={{color: "#262626"}}>
        Fazer Upload de Arquivos da Rede
      </h3>
      <div className="p-2 mt-4 border-bottom border-top rounded">
        <h5>Arquivos Suportados:</h5>

        <ul>
          <li>
            shapefiles e seus arquivos (.shp, .dbf, .prj etc) dentro
            de um arquivo ".rar"
          </li>

          <li>Arquivos JSON (".json")</li>
        </ul>
      </div>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            authUser.email === "prefeitura@gmail.com" ? (
              <div>
                {/* prefeitura */}
                <Uploader type={"viario"} />
              </div>
            ) : authUser.email === "rubens@gmail.com" ||
              authUser.email === "cagece@gmail.com" ? (
              <div>
                {/* cagece */}
                <Uploader type={"agua"} />
                <Uploader type={"esgoto"} />
              </div>
            ) : (
              <div>
                {/* cegas */}
                <Uploader type={"gas"} />
              </div>
            )
          ) : (
            <div>
              Você não tem privilégio para acessar esta página
            </div>
          )
        }
      </AuthUserContext.Consumer>
    </div>
  );
}

import React from "react";
import Uploader from "./Uploader";

import {AuthUserContext} from "../Session";

// import { Container } from './styles';

export default function Filer(props) {
  return (
    <div className="container mt-4">
      <h3>Fazer Upload de Arquivos da Rede</h3>
      <p style={{color: "#262626"}}>Aviso</p>
      <p style={{color: "#262626"}}>Tipos suportados de arquivos:</p>
      <ul>
        <li>
          shapefiles e seus arquivos (.shp, .dbf, etc) dentro de um
          arquivo ".rar"
        </li>
        <li>GeoJSON (".geojson")</li>
        <li>".json" no formato de arquivo GeoJSON</li>
      </ul>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            authUser.email === "rubens@gmail.com" ||
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
            "none"
          )
        }
      </AuthUserContext.Consumer>
    </div>
  );
}

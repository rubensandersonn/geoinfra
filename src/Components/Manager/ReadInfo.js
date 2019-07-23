import React from "react";

// import { Container } from './styles';

const ReadInfo = props => {
  const {properties} = props; // json
  const {interventions} = properties; // array

  const mapInfo = Object.keys(properties).map(key => {
    if (
      !key.match(/id|x|y|mun_geocodigo|em_operacao|interventions/gm)
    ) {
      return (
        <div key className="row container">
          <span style={{fontWeight: "bold"}}>
            {key.replace(/_/gm, " ")}
          </span>
          {": " + properties[key]}
        </div>
      );
    }
    return null;
  });

  const mapInterv = interventions.map((interv, index) => {
    const {responsable, data_ini, data_fim, description} = interv;
    return (
      <div>
        <div>Responsável: {responsable}</div>
        <div>Descrição: {description}</div>
        <div>data início: {data_ini}</div>
        <div>data fim: {data_fim}</div>
      </div>
    );
  });

  return (
    <div>
      <div>Dados</div>
      <div>{mapInfo}</div>
      <div>{mapInterv}</div>
    </div>
  );
};

export default ReadInfo;

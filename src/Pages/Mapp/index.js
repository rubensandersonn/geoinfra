import {
  Map,
  GoogleApiWrapper,
  Polyline,
  InfoWindow,
  Marker
} from "google-maps-react";

import React, {createRef, useContext, useState} from "react";
import MapCons from "../../Context/MapCons";
import AguaContext from "../../Context/AguaContext";
import EsgotoContext from "../../Context/EsgotoContext";
import GasContext from "../../Context/GasContext";

import {isFirstLattest} from "../../Components/Validators/ValidatorDate";

const Mapp = props => {
  // === === === CONTEXTS === === ===

  const {
    google,

    interventions,
    visibleLayer,
    visibleLayerInterv
  } = props;

  // console.log("map auth:", authority);

  const {agua} = useContext(AguaContext);
  const {esgoto} = useContext(EsgotoContext);

  const {gas} = useContext(GasContext);

  const {initialPlace, mapStyles} = MapCons;

  // toggle visible data
  const {visibleAgua, visibleEsgoto, visibleGas} = visibleLayer;
  const {
    visibleIntervAgua,
    visibleIntervGas,
    visibleIntervEsgoto,
    visibleIntervViario
  } = visibleLayerInterv;
  // const [interventions, setInterventions] = useState(null);

  // about marker...
  const [visibleInfo, setVisibleInfo] = useState(false);
  const [valueMarker, setValueMarker] = useState(false);
  const [positionMarker, setPositionMarker] = useState({
    lat: null,
    lng: null
  });

  // ======== AUX FUNCTIONs ===========

  const pretifyWindow = value => {
    return new Promise(resolve => {
      // mapeando o objeto
      const mapp = Object.keys(value).map(key => {
        if (!key.match(/id|x|y/gm)) {
          return (
            <div key className="row container">
              <span style={{fontWeight: "bold"}}>
                {key.replace(/_/gm, " ").replace(/^\w{3} /gm, "")}
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

      resolve(
        <div>
          <br />
          <h6>Propriedades:</h6>
          <hr />
          {mapp}
          <hr />
        </div>
      );
    });
  };

  /**
   * Tela de informação regular para usuários não logados
   * @param {*} key
   * @param {*} type
   * @param {*} coord
   */
  const showRegularInfo = async (key, type, coord) => {
    let val = {};

    switch (type) {
      case "agua":
        val = agua[key].properties; // essa propriedade nao existe originalmente.
        break;
      case "esgoto":
        val = esgoto[key].properties; // essa propriedade nao existe originalmente.
        break;
      case "gas":
        val = gas[key].properties; // essa propriedade nao existe originalmente.
        break;
      default:
        break;
    }

    // quem desativa a visibilidade é o map click
    setVisibleInfo(true);

    const mediaCoord = {
      lat: (coord[0].lat + coord[1].lat) / 2,
      lng: (coord[0].lng + coord[1].lng) / 2
    };

    //setando as coordenadas da infoWindow.
    // Espero receber dois valores lat lng
    setPositionMarker(mediaCoord);

    // setando o conteudo da infoWindow

    setValueMarker(await pretifyWindow(val));
  };

  // ======== CALLBACKS ==========

  /**
   * Quando o mapa for clickado, a infoWindow deve sumir
   */
  const onMapClicked = () => {
    setVisibleInfo(false);
  };

  /**
   * Quando a linha é clicada, deve mostrar uma tela simples de info
   * para usuários não logados. Para logados, mostrar tela de gerenciamento
   * @param {*} key
   * @param {*} type
   * @param {*} coord
   */
  const onPolyClicked = (key, type, coord) => {
    // mostra uma janela comum para todo usuário
    showRegularInfo(key, type, coord);
  };

  // quando o mouse passa sobre a poly, atualizar
  // {visibleInfo, valueMarker, positionMarker}
  // const onPolyHover = coord => {
  //   // quem desativa a visibilidade é o map click
  //   setVisibleInfo(true);

  //   const mediaCoord = {
  //     lat: (coord[0].lat + coord[1].lat) / 2,
  //     lng: (coord[0].lng + coord[1].lng) / 2
  //   };

  //   //setando as coordenadas da infoWindow. Espero receber dois valores lat lng
  //   setPositionMarker(mediaCoord);

  //   setValueMarker("Clique para ver mais");
  // };

  /**
   * Função que mapeia a rede de agua
   */
  let mapAgua = agua.map((el, index) => {
    // el.properties.interventions = [];
    el.properties.responsable = "cagece";
    el.properties.tipo_de_rede = "agua";

    var path = [];
    const coord = el.geometry.coordinates;

    coord.forEach((el, i) => {
      path.push({
        lat: coord[i][1],
        lng: coord[i][0]
      });
    });

    return (
      <Polyline
        key={index}
        path={path}
        options={{
          strokeColor: "#4863A0",
          strokeOpacity: 0.8,
          strokeWeight: 3
        }}
        onClick={e => onPolyClicked(index, "agua", path)}
        // onMouseover={() => onPolyHover(path)}
      />
    );
  });

  /**
   * Função que mapeia a rede de esgoto
   */
  let mapEsgoto = esgoto.map((el, index) => {
    // el.properties.interventions = [];
    el.properties.responsavel = "cagece";
    el.properties.tipo_de_rede = "esgoto";

    var path = [];
    const coord = el.geometry.coordinates;

    coord.forEach((el, i) => {
      path.push({
        lat: coord[i][1],
        lng: coord[i][0]
      });
    });

    return (
      <Polyline
        key={index}
        path={path}
        options={{
          strokeColor: "green",
          strokeOpacity: 0.8,
          strokeWeight: 3
        }}
        onClick={() => onPolyClicked(index, "esgoto", path)}
        // onMouseover={() => onPolyHover(path)}
      />
    );
  });
  /**
   * Função que mapeia a rede de esgoto
   */
  let mapGas = gas.map((el, index) => {
    // el.properties.interventions = [];
    el.properties.responsavel = "cegas";
    el.properties.tipo_de_rede = "gas";

    var path = [];
    const coord = el.geometry.coordinates;

    coord.forEach((el, i) => {
      path.push({
        lat: coord[i][1],
        lng: coord[i][0]
      });
    });

    return (
      <Polyline
        key={index}
        path={path}
        options={{
          strokeColor: "#C35817",
          strokeOpacity: 0.8,
          strokeWeight: 3
        }}
        onClick={() => onPolyClicked(index, "gas", path)}
        // onMouseover={() => onPolyHover(path)}
      />
    );
  });

  let mapRef = createRef();

  const onMapLoaded = google => {
    // addLegend(google);
    // addToggleButtons(google);
  };

  /**
   * Add legend to the map about the colors
   * @param {*} google
   */
  // const addLegend = google => {
  //   var legend = document.getElementById("legend");

  //   mapRef.current.map.controls[
  //     google.maps.ControlPosition.LEFT_BOTTOM
  //   ].push(legend);
  // };

  // === === MAPAS DE INTERVENÇÕES === ===

  const validateDate = dataTermino => {
    // getting today dd/mm/yyyy
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;

    if (isFirstLattest(today, dataTermino)) {
      return false;
    }

    return true;
  };

  const mapInterventionsEsgoto = Object.keys(interventions).map(
    endereco => {
      return interventions[endereco].map((interv, index) => {
        if (interv.tipo_rede !== "rede esgoto") {
          return null;
        }
        if (!validateDate(interv.data2)) {
          return null;
        }
        let url = "";
        let title = "";

        title = "Intervenção Rede Esgoto";
        url = require("../../utils/images/flagGreenLG.png");

        const {coordinates} = interv;

        return coordinates ? (
          <Marker
            title={title}
            key={index}
            position={coordinates}
            icon={url}
            onClick={() => {
              showInfoInterv(interv);
            }}
          />
        ) : (
          ""
        );
      });
    }
  );
  const mapInterventionsGas = Object.keys(interventions).map(
    endereco => {
      return interventions[endereco].map((interv, index) => {
        if (interv.tipo_rede !== "rede gás") {
          return null;
        }
        if (!validateDate(interv.data2)) {
          return null;
        }
        let url = "";
        let title = "";

        title = "Intervenção Rede Gás";
        url = require("../../utils/images/flagOrangeLG.png");

        const {coordinates} = interv;

        return coordinates ? (
          <Marker
            title={title}
            key={index}
            position={coordinates}
            icon={url}
            onClick={() => {
              showInfoInterv(interv);
            }}
          />
        ) : (
          ""
        );
      });
    }
  );

  const mapInterventionsAgua = Object.keys(interventions).map(
    endereco => {
      return interventions[endereco].map((interv, index) => {
        if (interv.tipo_rede !== "rede água") {
          return null;
        }
        if (!validateDate(interv.data2)) {
          return null;
        }
        let url = "";
        let title = "";

        title = "Intervenção Rede Água";
        url = require("../../utils/images/flagBlueLG.png");

        const {coordinates} = interv;

        return coordinates ? (
          <Marker
            title={title}
            key={index}
            position={coordinates}
            icon={url}
            onClick={() => {
              showInfoInterv(interv);
            }}
          />
        ) : (
          ""
        );
      });
    }
  );

  const mapInterventionsViario = Object.keys(interventions).map(
    endereco => {
      return interventions[endereco].map((interv, index) => {
        if (interv.tipo_rede !== "sistema viário") {
          return null;
        }
        let url = "";
        let title = "";

        title = "Intervenção Sistema Viário";
        url = require("../../utils/images/flagGrayLG.png");

        const {coordinates} = interv;

        return coordinates ? (
          <Marker
            title={title}
            key={index}
            position={coordinates}
            icon={url}
            onClick={() => {
              showInfoInterv(interv);
            }}
          />
        ) : (
          ""
        );
      });
    }
  );

  const prettifyInterv = interv => {
    if (interv.constructor !== {}.constructor) {
      return "";
    }

    return (
      <div>
        <br />
        <h6>Intervenção</h6>
        <hr />
        <div>
          <span style={{fontWeight: "bold"}}>Responsável: </span>
          {interv.responsable}
        </div>
        <div>
          <span style={{fontWeight: "bold"}}>Tipo Rede: </span>
          {interv.tipo_rede}
        </div>
        <div>
          <span style={{fontWeight: "bold"}}>Endereço: </span>
          {interv.endereco.split(",")[0]}
        </div>
        <div style={{maxWidth: 150}}>
          <span style={{fontWeight: "bold"}}>Descrição: </span>
          {interv.description}
        </div>
        <div>
          <span style={{fontWeight: "bold"}}>data início: </span>
          {interv.data1}
        </div>
        <div>
          <span style={{fontWeight: "bold"}}>data Fim: </span>
          {interv.data2}
        </div>
        <hr />
      </div>
    );
  };

  const showInfoInterv = interv => {
    // quem desativa a visibilidade é o map click
    setVisibleInfo(true);

    //setando as coordenadas da infoWindow.
    // Espero receber dois valores lat lng
    setPositionMarker(interv.coordinates);

    // setando o conteudo da infoWindow

    setValueMarker(prettifyInterv(interv));
  };

  return (
    <div>
      <Map
        google={google}
        style={{maxWidth: "75%", minHeight: 500}}
        zoom={16}
        styles={mapStyles}
        initialCenter={initialPlace}
        onClick={onMapClicked}
        streetViewControl={false}
        ref={mapRef}
        onReady={({google}) => onMapLoaded(google)}
      >
        <InfoWindow
          visible={visibleInfo}
          key={1}
          position={
            new google.maps.LatLng(
              positionMarker.lat,
              positionMarker.lng
            ) || {
              lat: 0,
              lng: 0
            }
          }
        >
          <div className="container">
            <div className="row">
              <div style={{color: "black"}}>{valueMarker}</div>
            </div>
          </div>
        </InfoWindow>

        {visibleGas && mapGas}
        {visibleAgua && mapAgua}
        {visibleEsgoto && mapEsgoto}
        {visibleIntervAgua && mapInterventionsAgua}
        {visibleIntervGas && mapInterventionsGas}
        {visibleIntervEsgoto && mapInterventionsEsgoto}
        {visibleIntervViario && mapInterventionsViario}
      </Map>
      {/* legendas: */}
      <div
        style={{display: "none"}}
        className="col-lg-2 bg-light p-2 m-4"
        id="layers"
      >
        <h5>Mostrar ou Esconder Camadas</h5>
      </div>
      {/* <div
        style={{display: "none", minWidth: 250}}
        className="col-lg-2 bg-light p-2 m-4"
        id="legend"
      >
        <Legend />
      </div> */}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_URI_GOOGLE_MAPS
})(Mapp);

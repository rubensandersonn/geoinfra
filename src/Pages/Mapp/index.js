import {
  Map,
  GoogleApiWrapper,
  Polyline,
  InfoWindow
} from "google-maps-react";

import React, {createRef, useContext, useState} from "react";
import MapCons from "../../Context/MapCons";
import AguaContext from "../../Context/AguaContext";
import EsgotoContext from "../../Context/EsgotoContext";
import GasContext from "../../Context/GasContext";
import FirebaseContext from "../../Components/Firebase/context";

const Mapp = props => {
  // === === === CONTEXTS === === ===

  const firebase = useContext(FirebaseContext);

  const {
    google,
    authority,
    setKey,
    setType,

    visibleLayer
  } = props;

  // console.log("map auth:", authority);

  const {agua, dispatchAgua} = useContext(AguaContext);
  const {esgoto, dispatchEsgoto} = useContext(EsgotoContext);

  const {gas, dispatchGas} = useContext(GasContext);

  const {initialPlace, mapStyles, polyTypes} = MapCons;

  // toggle visible data
  const {visibleAgua, visibleEsgoto, visibleGas} = visibleLayer;
  const [interventions, setInterventions] = useState(null);

  // about marker...
  const [visibleInfo, setVisibleInfo] = useState(false);
  const [valueMarker, setValueMarker] = useState(false);
  const [positionMarker, setPositionMarker] = useState({
    lat: null,
    lng: null
  });

  // ======== AUX FUNCTIONs ===========

  const pretifyWindow = value => {
    setInterventions(null);
    return new Promise(resolve => {
      // mapeando o objeto
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

      resolve(
        <div>
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
    // console.log("poly clicked", key, type, coord[0]);

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
    let el;

    switch (type) {
      case "agua":
        el = agua[key];
        break;
      case "esgoto":
        el = esgoto[key];
        break;
      case "gas":
        el = esgoto[key];
        break;
      default:
        el = el;
        break;
    }

    // mostra uma janela comum para todo usuário
    showRegularInfo(key, type, coord);
  };

  // quando o mouse passa sobre a poly, atualizar
  // {visibleInfo, valueMarker, positionMarker}
  const onPolyHover = coord => {
    // console.log("poly hovered", coord[0]);

    // quem desativa a visibilidade é o map click
    setVisibleInfo(true);

    const mediaCoord = {
      lat: (coord[0].lat + coord[1].lat) / 2,
      lng: (coord[0].lng + coord[1].lng) / 2
    };

    //setando as coordenadas da infoWindow. Espero receber dois valores lat lng
    setPositionMarker(mediaCoord);

    setValueMarker("Clique para ver mais");
  };

  /**
   * Função que mapeia a rede de agua
   */
  let mapAgua = agua.map((el, index) => {
    // el.properties.interventions = [];
    el.properties.responsable = "cagece";
    el.properties.tipo_de_rede = "agua";

    var path = [];
    const coord = el.geometry.coordinates;

    // endereço inicio
    path.push({
      lat: coord[0][1],
      lng: coord[0][0]
    });
    // endereço fim
    path.push({
      lat: coord[1][1],
      lng: coord[1][0]
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
        onMouseover={() => onPolyHover(path)}
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

    // endereço inicio
    path.push({
      lat: coord[0][1],
      lng: coord[0][0]
    });
    // endereço fim
    path.push({
      lat: coord[1][1],
      lng: coord[1][0]
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
        onMouseover={() => onPolyHover(path)}
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

    // endereço inicio
    path.push({
      lat: coord[0][1],
      lng: coord[0][0]
    });
    // endereço fim
    path.push({
      lat: coord[1][1],
      lng: coord[1][0]
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
        onMouseover={() => onPolyHover(path)}
      />
    );
  });

  let mapRef = createRef();

  const onMapLoaded = google => {
    addLegend(google);
    // addToggleButtons(google);
  };

  /**
   * Add legend to the map about the colors
   * @param {*} google
   */
  const addLegend = google => {
    var legend = document.getElementById("legend");
    legend.style.display = "none";

    var div1 = document.createElement("div1");
    div1.innerHTML =
      '<div class="input-color"> <input style="border-width: 0px; color: #262626" type="text" value="REDE ÁGUA" /> <div class="color-box" style="background-color: #4863A0;"></div></div>';

    legend.appendChild(div1);

    var div2 = document.createElement("div2");
    div2.innerHTML =
      '<div class="input-color"> <input style="border-width: 0px; color: #262626" type="text" value="REDE ESGOTO" /> <div class="color-box" style="background-color: green;"></div></div>';

    legend.appendChild(div2);

    var div3 = document.createElement("div3");
    div3.innerHTML =
      '<div class="input-color"> <input style="border-width: 0px; color: #262626" type="text" value="REDE GAS" /> <div class="color-box" style="background-color: #C35817;"></div></div>';

    legend.appendChild(div3);

    legend.style.display = "block";

    mapRef.current.map.controls[
      google.maps.ControlPosition.LEFT_BOTTOM
    ].push(legend);
  };

  return (
    <>
      <Map
        google={google}
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
      </Map>
      {/* legendas: */}
      <div
        style={{display: "none"}}
        className="col-lg-2 bg-light p-2 m-4"
        id="layers"
      >
        <h5>Mostrar ou Esconder Camadas</h5>
      </div>
      <div
        style={{display: "none"}}
        className="col-lg-2 bg-light p-2 m-4"
        id="legend"
      >
        <h3>Legenda</h3>
      </div>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_URI_GOOGLE_MAPS
})(Mapp);

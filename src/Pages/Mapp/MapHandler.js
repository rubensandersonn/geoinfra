import React, {
  useReducer,
  useState,
  useEffect,
  useContext
} from "react";

import mapContext from "../../Context/mapContext";
import markerContext from "../../Context/markerContext";
import {Polyline} from "google-maps-react";
import jsonAgua from "../../utils/jsons/rda_meireles.json";
import jsonEsgoto from "../../utils/jsons/rde_meireles.json";
import CadForm from "../../Components/Forms/CadForm";
import Mapp from ".";
import MapOperations from "../../Components/MapOperations";

const types = {cad: "CAD", upd: "UPD"};

const reducerAgua = (state, action) => {
  switch (action.type) {
    case types.cad:
      return {
        ...state,
        agua: {agua: [state.agua.agua, action.newItem]}
      };
    case types.upd:
      const {index, newItem} = action;
      let agua = state.agua;
      agua.agua[index] = newItem;
      return {...state, agua};
    default:
      return state;
  }
};
const reducerEsgoto = (state, action) => {
  switch (action.type) {
    case types.cad:
      return {
        ...state,
        esgoto: {esgoto: [state.esgoto.esgoto, action.newItem]}
      };
    case types.upd:
      const {index, newItem} = action;
      let esgoto = state.esgoto;
      esgoto.esgoto[index] = newItem;
      return {...state, esgoto};
    default:
      return state;
  }
};

const MapHandler = () => {
  // const [st, setSt] = useState("");

  const {initialPlace, mapStyles} = useContext(mapContext);

  const [agua, dispatchAgua] = useReducer(reducerAgua, {
    agua: jsonAgua.features
  });
  const [esgoto, dispatchEsgoto] = useReducer(reducerEsgoto, {
    esgoto: jsonEsgoto.features
  });

  // about marker...
  const [visibleInfo, setVisibleInfo] = useState(false);
  const [valueMarker, setValueMarker] = useState(<div />);
  const [positionMarker, setPositionMarker] = useState({
    lat: null,
    lng: null
  });

  // CALLBACKS

  // pretify infoWindow
  const pretifyWindow = value => {
    const mapp = Object.keys(value).map(key => {
      if (!key.match(/id|x|y/gm)) {
        return (
          <div className="row container">
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

    return mapp;
  };

  // quando o mapa for clickado, a infoWindow deve sumir
  const onMapClicked = () => {
    setVisibleInfo(false);
  };

  function isRightClick(e) {
    var isRightMB;
    console.log(e);

    if ("which" in e)
      // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
      isRightMB = e.which == 3;
    else if ("button" in e)
      // IE, Opera
      isRightMB = e.button == 2;

    return isRightMB;
  }

  const showPropsPoly = (key, type, coord) => {
    console.log("poly clicked", key, type, coord[0]);

    let val = {};

    switch (type) {
      case "agua":
        val = agua.agua[key].properties; // essa propriedade nao existe originalmente.
        break;
      case "esgoto":
        val = esgoto.esgoto[key].properties; // essa propriedade nao existe originalmente.
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

    //setando as coordenadas da infoWindow. Espero receber dois valores lat lng
    setPositionMarker(mediaCoord);

    // setando o conteudo da infoWindow
    setValueMarker(pretifyWindow(val));
  };

  // quando uma linha é clicada
  const onPolyClicked = (e, key, type, coord) => {
    const isRight = isRightClick(e);

    if (isRight) {
      console.log("was right click");
    } else {
      showPropsPoly(key, type, coord);
    }
  };

  // quando o mouse passa sobre a poly, atualizar
  // {visibleInfo, valueMarker, positionMarker}
  const onPolyHover = (key, type, coord) => {
    console.log("poly hovered", key, type, coord[0]);

    let emOp = false;

    switch (type) {
      case "agua":
        emOp = agua.agua[key].properties.em_operacao; // essa propriedade nao existe originalmente.
        break;
      case "esgoto":
        emOp = esgoto.esgoto[key].properties.em_operacao; // essa propriedade nao existe originalmente.
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

    //setando as coordenadas da infoWindow. Espero receber dois valores lat lng
    setPositionMarker(mediaCoord);

    // setando a infoWindow
    const val = emOp
      ? {Situação: "Em Operação!"}
      : {Situação: "Trecho sem obras."};
    setValueMarker(pretifyWindow(val));
  };

  // mapping a agua

  let mapAgua = agua.agua.map((el, index) => {
    el.properties.em_operacao = true;

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
          strokeColor: "pink",
          strokeOpacity: 0.8,
          strokeWeight: 3
        }}
        onClick={e => onPolyClicked(e, index, "agua", path)}
        onMouseover={() => onPolyHover(index, "agua", path)}
      />
    );
  });

  // mapeando o esgoto
  let mapEsgoto = esgoto.esgoto.map((el, index) => {
    el.properties.em_operacao = true;

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
        onMouseover={() => onPolyHover(index, "esgoto", path)}
      />
    );
  });

  return (
    <>
      <MapOperations />
      <mapContext.Provider
        value={{
          initialPlace,
          mapStyles,
          mapAgua,
          mapEsgoto,
          onMapClicked
        }}
      >
        <markerContext.Provider
          value={{visibleInfo, valueMarker, positionMarker}} // quem altera isso? as polylines
        >
          <Mapp />
        </markerContext.Provider>
      </mapContext.Provider>
    </>
  );
};

export default MapHandler;

import React, { useReducer, useContext } from "react";
import Mapp from ".";
import mapContext from "../../Context/mapContext";
import { Polyline } from "google-maps-react";
import jsonAgua from "../../utils/jsons/rda_meireles.json";
import jsonEsgoto from "../../utils/jsons/rde_meireles.json";

const types = { cad: "CAD", upd: "UPD" };

const reducer = (state, action) => {
  switch (action.type) {
    case types.cad:
      return state;
    case types.upd:
      return state;
    default:
      return state;
  }
};

const MapHandler = () => {
  const [agua, dispatchAgua] = useReducer(reducer, { agua: jsonAgua.features });
  const [esgoto, dispatchEsgoto] = useReducer(reducer, {
    esgoto: jsonEsgoto.features
  });

  // quando uma linha é clicada

  const polyClicked = coord => {
    console.log("line clicked", coord);
  };

  // mapping a agua

  let mapAgua = agua.agua.map((el, index) => {
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
          strokeOpacity: 0.75,
          strokeWeight: 2
        }}
        onClick={() => polyClicked(path)}
      />
    );
  });

  // mapeando o esgoto
  let mapEsgoto = esgoto.esgoto.map((el, index) => {
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
          strokeOpacity: 0.75,
          strokeWeight: 2
        }}
        onClick={() => polyClicked(path)}
      />
    );
  });

  const { initialPlace, mapStyles } = useContext(mapContext);

  return (
    <>
      <mapContext.Provider
        value={{ initialPlace, mapStyles, mapAgua, mapEsgoto }}
      >
        <Mapp />
      </mapContext.Provider>
    </>
  );
};

export default MapHandler;

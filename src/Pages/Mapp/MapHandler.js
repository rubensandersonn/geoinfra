import React, {
  useReducer,
  useState,
  useEffect,
  useContext
} from "react";
import Mapp from ".";
import mapContext from "../../Context/mapContext";
import {Polyline} from "google-maps-react";
import jsonAgua from "../../utils/jsons/rda_meireles.json";
import jsonEsgoto from "../../utils/jsons/rde_meireles.json";
import CadForm from "../../Components/Forms/CadForm";

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
  const [st, setSt] = useState("");

  useEffect(() => {
    console.log(st);
  }, [st]);

  const [agua, dispatchAgua] = useReducer(reducerAgua, {
    agua: jsonAgua.features
  });
  const [esgoto, dispatchEsgoto] = useReducer(reducerEsgoto, {
    esgoto: jsonEsgoto.features
  });

  const {initialPlace, mapStyles} = useContext(mapContext);

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

  return (
    <>
      <CadForm onSubmit={e => console.log(e)} />
      <mapContext.Provider
        value={{initialPlace, mapStyles, mapAgua, mapEsgoto}}
      >
        {/* <Mapp /> */}
      </mapContext.Provider>
    </>
  );
};

export default MapHandler;

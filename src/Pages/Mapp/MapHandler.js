import React, {useState, useReducer} from "react";

import jsonAgua from "../../utils/jsons/rda_meireles.json";
import jsonEsgoto from "../../utils/jsons/rde_meireles.json";
import jsonGas from "../../utils/jsons/gas.json";

import Mapp from ".";
import MapOperations from "../../Components/MapOperations";
import Manager from "../../Components/Manager";
//import {AuthUserContext} from "../../Components/Session";
import Modal from "react-responsive-modal";
import MapCons from "../../Context/MapCons";

const reducer = (state, action) => {
  switch (action.type) {
    case "create": {
      return [state, action.value];
    }
    case "update": {
      state[action.index] = action.value;
    }
    case "delete": {
      return state.splice(action.index, 1);
    }
  }
};

const MapHandler = () => {
  //=== === states === ===

  const [open, setOpen] = useState(false);
  const [polyType, setPolyType] = useState();
  const [key, setKey] = useState({});

  //=== === contexts === ===

  const {polyTypes} = MapCons;

  const [agua, dispatchAgua] = useReducer(reducer, jsonAgua.features);

  console.log(agua);

  const [esgoto, dispatchEsgoto] = useReducer(
    reducer,
    jsonEsgoto.features
  );

  const [gas, dispatchGas] = useReducer(reducer, jsonGas.features);

  //=== === Callbacks === ===

  const setModalClose = () => {
    setOpen(false);
  };

  const setModalOpen = () => {
    setOpen(true);
  };

  const setType = type => {
    setPolyType(polyTypes[type]);
  };

  return (
    <>
      <Modal open={open} onClose={setModalClose} little={false}>
        <div className="container mt-4 p-4">
          <div className="mt-4 pt-4">
            <Manager
              key={key}
              type={polyType}
              redAgua={{agua, dispatchAgua}}
              redEsgoto={{esgoto, dispatchEsgoto}}
              redGas={{gas, dispatchGas}}
            />
          </div>
        </div>
      </Modal>

      <MapOperations />

      <Mapp
        setModalOpen={setModalOpen}
        setType={setType}
        setKey={setKey}
        redAgua={{agua, dispatchAgua}}
        redEsgoto={{esgoto, dispatchEsgoto}}
        redGas={{gas, dispatchGas}}
      />
    </>
  );
};

export default MapHandler;

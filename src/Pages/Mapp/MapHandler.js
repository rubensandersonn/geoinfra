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
import {AuthUserContext} from "../../Components/Session/index.js";
import teste1 from "../Testes/teste1.js";
import NoButton from "../../Components/Modall/NoButton.js";

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

const MapHandler = props => {
  //=== === states === ===

  const [open, setOpen] = useState(false);
  const [polyType, setPolyType] = useState();
  const [key, setKey] = useState({});

  //=== === contexts === ===

  const {polyTypes} = MapCons;

  const [agua, dispatchAgua] = useReducer(reducer, jsonAgua.features);

  const [esgoto, dispatchEsgoto] = useReducer(
    reducer,
    jsonEsgoto.features
  );

  const [gas, dispatchGas] = useReducer(reducer, jsonGas.features);

  //=== === Callbacks === ===

  const setModalClose = () => {
    console.log("open false");
    setOpen(false);
  };

  const setModalOpen = () => {
    console.log("open true!!!");
    setOpen(true);
  };

  const setType = type => {
    console.log("setando o tipo ", type);
    setPolyType(type);
  };

  return (
    <>
      {/* <Modal open={open} onClose={setModalClose} little={false}>
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
      </Modal> */}

      <MapOperations />

      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            authUser.email === "rubens@gmail.com" ||
            authUser.email === "prefeitura@gmail.com" ? (
              <Mapp
                setModalOpen={setOpen}
                setType={setType}
                setKey={setKey}
                redAgua={{agua, dispatchAgua}}
                redEsgoto={{esgoto, dispatchEsgoto}}
                redGas={{gas, dispatchGas}}
                authority={"prefeitura"}
              />
            ) : authUser.email === "cagece" ? (
              <Mapp
                setModalOpen={setOpen}
                setType={setType}
                setKey={setKey}
                redAgua={{agua, dispatchAgua}}
                redEsgoto={{esgoto, dispatchEsgoto}}
                redGas={{gas, dispatchGas}}
                authority={"cagece"}
              />
            ) : (
              <Mapp
                setModalOpen={setOpen}
                setType={setType}
                setKey={setKey}
                redAgua={{agua, dispatchAgua}}
                redEsgoto={{esgoto, dispatchEsgoto}}
                redGas={{gas, dispatchGas}}
                authority={"cegas"}
              />
            )
          ) : (
            <Mapp
              setModalOpen={setOpen}
              setType={setType}
              setKey={setKey}
              redAgua={{agua, dispatchAgua}}
              redEsgoto={{esgoto, dispatchEsgoto}}
              redGas={{gas, dispatchGas}}
              authority={"none"}
            />
          )
        }
      </AuthUserContext.Consumer>
      <NoButton
        open={open}
        setOpen={setOpen}
        content={() => teste1((props = {key, type: polyType, agua}))}
        //content={() => <teste1 key agua type={polyType} />}
        little={false}
      />
    </>
  );
};

export default MapHandler;

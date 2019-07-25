import React, {useState, useReducer} from "react";

import jsonAgua from "../../utils/jsons/rda_meireles.json";
import jsonEsgoto from "../../utils/jsons/rde_meireles.json";
import jsonGas from "../../utils/jsons/gas.json";

import Mapp from ".";
import MapOperations from "../../Components/MapOperations";
import Manager from "../../Components/Manager";
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
      return state;
    }
    case "update-intervention": {
      return state.map(el => {
        const newprops = el.properties;

        if (el.id === action.index) {
          newprops.interventions[action.indexInterv] = action.value;
          return {...el, properties: newprops};
        } else {
          return el;
        }
      });
    }
    case "create-intervention": {
      console.log("case is create interventions: ", action);
      return state.map(el => {
        if (el.id === action.index) {
          console.log("reduced");
          const newprops = el.properties;
          newprops.interventions.push(action.value);
          return {...el, properties: newprops};
        } else {
          return el;
        }
      });
    }
    case "delete-intervention": {
      return state.map(el => {
        const newprops = el.properties;

        if (el.id === action.index) {
          newprops.interventions.splice(action.indexInterv, 1);
          return {...el, properties: newprops};
        } else {
          return el;
        }
      });
    }
    case "delete": {
      state.splice(action.index, 1);
      return state;
    }
  }
};

const MapHandler = props => {
  //=== === states === ===
  // const jsonGas = {features: []};

  const [open, setOpen] = useState(false);
  const [polyType, setPolyType] = useState();
  const [key, setKey] = useState({});

  //=== === contexts === ===

  const [agua, dispatchAgua] = useReducer(reducer, jsonAgua.features);

  const [esgoto, dispatchEsgoto] = useReducer(
    reducer,
    jsonEsgoto.features
  );

  const [gas, dispatchGas] = useReducer(reducer, jsonGas.features);

  //=== === Callbacks === ===

  const setModalClose = () => {
    // console.log("open false");
    setOpen(false);
  };

  const setModalOpen = () => {
    // console.log("open true!!!");
    setOpen(true);
  };

  const setType = type => {
    // console.log("setando o tipo ", type);
    setPolyType(type);
  };

  return (
    <>
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
        content={() =>
          teste1(
            (props = {
              reducerRede:
                polyType === "agua"
                  ? {
                      rede: agua,
                      dispatch: dispatchAgua,
                      authority: "cagece"
                    }
                  : polyType === "esgoto"
                  ? {
                      rede: esgoto,
                      dispatch: dispatchEsgoto,
                      authority: "cagece"
                    }
                  : {
                      rede: gas,
                      dispatch: dispatchGas,
                      authority: "cegas"
                    },
              key,
              type: polyType
            })
          )
        }
        //content={() => <teste1 key agua type={polyType} />}
        little={false}
      />
    </>
  );
};

export default MapHandler;

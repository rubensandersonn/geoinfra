import React, {createContext, useState, useReducer} from "react";

import jsonAgua from "../../utils/jsons/rda_meireles.json";
import jsonEsgoto from "../../utils/jsons/rde_meireles.json";
import jsonGas from "../../utils/jsons/gas.json";

import Mapp from ".";
import MapOperations from "../../Components/MapOperations";
import {AuthUserContext} from "../../Components/Session/index.js";
import Menage from "../Testes/Menage.js";
import NoButton from "../../Components/Modall/NoButton.js";
import AguaContext from "../../Context/AguaContext.js";
import EsgotoContext from "../../Context/EsgotoContext.js";
import GasContext from "../../Context/GasContext.js";

const reducer = (state, action) => {
  switch (action.type) {
    case "create": {
      return [state, action.value];
    }
    case "update": {
      state[action.index] = action.value;
      return state;
    }
    case "delete": {
      state.splice(action.index, 1);
      return state;
    }
    case "update-intervention": {
      return state.map(el => {
        if (el.id === action.index) {
          if (!el.properties.interventions) {
            el.properties.interventions = [];
          }
          const newprops = el.properties;
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
          if (!newprops.interventions) {
            newprops.interventions = [];
          }
          newprops.interventions.push(action.value);
          console.log("objeto passado: ", {
            ...el,
            properties: newprops
          });
          el.properties = newprops;
          return {...el, properties: newprops};
        } else {
          return el;
        }
      });
    }
    case "delete-intervention": {
      return state.map(el => {
        const newprops = el.properties;

        if (el.id === action.index && el.properties.interventions) {
          newprops.interventions.splice(action.indexInterv, 1);
          return {...el, properties: newprops};
        } else {
          return el;
        }
      });
    }
    default: {
      console.log("(reducer handler) erro ao reduzir");
      break;
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

  let [agua, dispatchAgua] = useReducer(reducer, jsonAgua.features);

  let [esgoto, dispatchEsgoto] = useReducer(
    reducer,
    jsonEsgoto.features
  );

  let [gas, dispatchGas] = useReducer(reducer, jsonGas.features);

  //=== === Callbacks === ===

  const setType = type => {
    // console.log("setando o tipo ", type);
    setPolyType(type);
  };

  return (
    <>
      <AguaContext.Provider value={{agua, dispatchAgua}}>
        <EsgotoContext.Provider value={{esgoto, dispatchEsgoto}}>
          <GasContext.Provider value={{gas, dispatchGas}}>
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
                      authority={"prefeitura"}
                    />
                  ) : authUser.email === "cagece" ? (
                    <Mapp
                      setModalOpen={setOpen}
                      setType={setType}
                      setKey={setKey}
                      authority={"cagece"}
                    />
                  ) : (
                    <Mapp
                      setModalOpen={setOpen}
                      setType={setType}
                      setKey={setKey}
                      authority={"cegas"}
                    />
                  )
                ) : (
                  <Mapp
                    setModalOpen={setOpen}
                    setType={setType}
                    setKey={setKey}
                    authority={"none"}
                  />
                )
              }
            </AuthUserContext.Consumer>
            <NoButton
              open={open}
              setOpen={setOpen}
              // content={() =>
              //   teste1(
              //     (props = {
              //       key,
              //       type: polyType
              //     })
              //   )
              // }
              //content={() => <teste1 key agua type={polyType} />}
              little={false}
            >
              <Menage index={key} type={polyType} />
              {/* <Teste2 index={key} type={polyType} /> */}
            </NoButton>
          </GasContext.Provider>
        </EsgotoContext.Provider>
      </AguaContext.Provider>
    </>
  );
};

export default MapHandler;

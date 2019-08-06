import React, {
  useState,
  useEffect,
  useContext,
  useReducer
} from "react";

import jsonAgua from "../../utils/jsons/rda_meireles.json";
import jsonEsgoto from "../../utils/jsons/rde_meireles.json";
import jsonGas from "../../utils/jsons/rdg_meireles.json";

import Mapp from ".";

import {AuthUserContext} from "../../Components/Session/index.js";
// import Meneger from "../Testes/Meneger.js";
// import NoButton from "../../Components/Modall/NoButton.js";
import Holder from "../../Components/Manager/Holder";
import AguaContext from "../../Context/AguaContext.js";
import EsgotoContext from "../../Context/EsgotoContext.js";
import GasContext from "../../Context/GasContext.js";
import {FirebaseContext} from "../../Components/Firebase/index.js";

const reducer = (state, action) => {
  switch (action.type) {
    case "updateAll": {
      return action.value;
    }
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

  const [interventions, setInterv] = useState([]);

  const [polyType, setPolyType] = useState();
  const [key, setKey] = useState({});

  //=== === contexts === ===

  let firebase = useContext(FirebaseContext);
  // const [{upd_agua, upd_esgoto, upd_gas }, setUpd] = useState()

  // === === reducers === ===

  let [agua, dispatchAgua] = useReducer(reducer, jsonAgua.features);

  let [esgoto, dispatchEsgoto] = useReducer(
    reducer,
    jsonEsgoto.features
  );

  let [gas, dispatchGas] = useReducer(reducer, jsonGas.features);

  useEffect(() => {
    // firebase.getRefDB("esgoto").on("value", snap => {
    //   console.log("opaaaa esgoto: ", snap.val());
    // });
    firebase.getRefAgua().on("value", snap => {
      console.log("(agua) recebidos novos dados do firebase:");
      dispatchAgua({type: "updateAll", value: snap.val()});
    });
    firebase.getRefEsgoto().on("value", snap => {
      console.log("(esgoto) recebidos novos dados do firebase:");
      dispatchEsgoto({type: "updateAll", value: snap.val()});
    });
    firebase.getRefGas().on("value", snap => {
      console.log("(gas) recebidos novos dados do firebase:");
      dispatchGas({type: "updateAll", value: snap.val()});
    });
  }, []);

  //=== === Callbacks === ===

  const setType = type => {
    // console.log("setando o tipo ", type);
    setPolyType(type);
  };

  const [
    {visibleAgua, visibleGas, visibleEsgoto},
    setLayer
  ] = useState({
    visibleAgua: true,
    visibleGas: true,
    visibleEsgoto: true
  });

  function toggleMenu() {
    var x = document.getElementById("navv");
    if (x.style.display === "none") {
      x.style.display = "inline";
    } else {
      x.style.display = "none";
    }
  }

  const toggleLayer = type => {
    switch (type) {
      case "agua": {
        setLayer(state => ({...state, visibleAgua: !visibleAgua}));
        break;
      }
      case "gas": {
        setLayer(state => ({...state, visibleGas: !visibleGas}));
        break;
      }
      case "esgoto": {
        setLayer(state => ({
          ...state,
          visibleEsgoto: !visibleEsgoto
        }));
        break;
      }
      default: {
        console.log("(toggleLayer) erro ao chavear o tipo");
      }
    }
  };

  return (
    <>
      <AguaContext.Provider value={{agua, dispatchAgua}}>
        <EsgotoContext.Provider value={{esgoto, dispatchEsgoto}}>
          <GasContext.Provider value={{gas, dispatchGas}}>
            <AuthUserContext.Consumer>
              {authUser => {
                const authority = authUser
                  ? authUser.email === "rubens@gmail.com" ||
                    authUser.email === "prefeitura@gmail.com"
                    ? "prefeitura"
                    : authUser.email === "cagece@gmail.com"
                    ? "cagece"
                    : "cegas"
                  : "none";

                return (
                  <div className="col-lg-12 row">
                    <div className="border rounded">
                      {/* <div className="text-center">
                        <h4>Intervenções</h4>
                      </div> */}

                      <Holder
                        authority={authority}
                        index={key}
                        type={polyType}
                        toggleLayer={toggleLayer}
                      />
                    </div>

                    <div>
                      {/* <Mapp
                        setType={setType}
                        setKey={setKey}
                        authority={authority}
                        visibleLayer={{
                          visibleAgua,
                          visibleEsgoto,
                          visibleGas
                        }}
                      /> */}
                    </div>
                  </div>
                );
              }}
            </AuthUserContext.Consumer>
            {/* <NoButton open={open} setOpen={setOpen} little={false}>
              <Meneger index={key} type={polyType} />
              
            </NoButton> */}
          </GasContext.Provider>
        </EsgotoContext.Provider>
      </AguaContext.Provider>
    </>
  );
};

export default MapHandler;

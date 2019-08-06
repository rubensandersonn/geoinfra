import React, {useContext, useState, useEffect} from "react";
import Create from "../../Components/Manager/Create";

import {FirebaseContext} from "../../Components/Firebase";

// import html2pdf from "html2pdf.js";
import Search from "../Search";
import Update from "./Update";

import Links from "../Modall/Links";

// import { Container } from './styles';

const Holder = props => {
  let firebase = useContext(FirebaseContext);

  const {authority, type, index, toggleLayer} = props;

  let rede = [];
  let [interventions, setInterventions] = useState({});

  //
  // === MOST IMPORTANT EFFECT ===
  //
  useEffect(() => {
    firebase.getRefInterventions().on("value", snap => {
      if (snap && snap.val()) {
        // let novo = interventions;
        // novo.push(snap.val());

        setInterventions(snap.val());
        interventions = snap.val();

        console.log(
          "(holder) child added:",

          interventions
        );
      } else {
        console.log("(holder) child added wrongly:");
      }
    });
  }, []);

  const submitCreate = obj => {
    obj.responsable = authority;

    console.log("(submit create) nova interv:", obj);
    console.log("(submit create) intervenções 1:", interventions);

    interventions && interventions[obj.endereco]
      ? interventions[obj.endereco].push(obj)
      : (interventions[obj.endereco] = [obj]);

    console.log("(submit create) intervenções 2:", interventions);
    //
    firebase.doCreateIntervention(
      interventions[obj.endereco],
      interventions[obj.endereco].length - 1
    );
  };
  /**
   * Suponho que só foi mostrado se tem autoridade para atualizar
   * @param {*} obj
   */
  const submitUpdate = obj => {
    // obj.responsable = authority;
    console.log("(submit update) nova interv:", obj, indexInterv);

    interventions && interventions[obj.endereco]
      ? (interventions[obj.endereco][indexInterv] = obj)
      : console.log("(submit update) hey thats ilegal!");

    console.log("(submit update) intervenções:", interventions);
    //
    firebase.doUpdateIntervention(
      interventions[obj.endereco],
      indexInterv
    );
  };

  const submitDelete = indexInterv => {
    firebase.doDeleteIntervention(index, type, indexInterv);
  };

  const pretifyWindow = value => {
    if (value.constructor !== {}.constructor) {
      return "";
    }
    return Object.keys(value).map(keyy => (
      <div key={keyy}>
        <span style={{fontWeight: "bold"}}>{keyy}</span>:{" "}
        {value[keyy]}
      </div>
    ));
  };

  const [visibleCadastrar, setVisibleCadastrar] = useState(false);
  const [visibleAtualizar, setVisibleAtualizar] = useState(false);

  const toggleCadastrar = () => {
    setVisibleCadastrar(!visibleCadastrar);
  };
  const toggleAtualizar = () => {
    setVisibleAtualizar(!visibleAtualizar);
  };

  const [visiblePlanejamento, setVisiblePlanejamento] = useState(
    false
  );

  // element chosen from search bar
  const [element, setEl] = useState(null);
  const [indexInterv, setIndex] = useState(null);

  // === === checkboxes === ===

  const aguaChecked = () => {
    toggleLayer("agua");
  };
  const gasChecked = () => {
    toggleLayer("gas");
  };
  const esgotoChecked = () => {
    toggleLayer("esgoto");
  };

  // === === planejamentos cheks === ===

  const aguaPlanChecked = () => {
    // toggleLayer("agua");
  };
  const gasPlanChecked = () => {
    // toggleLayer("gas");
  };
  const esgotoPlanChecked = () => {
    // toggleLayer("esgoto");
  };

  // === === modal things === ===

  const [state, setState] = useState({
    aguaURL: null,
    esgotoURL: null,
    gasURL: null
  });

  useEffect(() => {
    firebase
      .getRef()
      .child("rda_meireles.json")
      .getDownloadURL()
      .then(url => {
        setState(state => ({...state, aguaURL: url}));
      });
    firebase
      .getRef()
      .child("rde_meireles.json")
      .getDownloadURL()
      .then(url => {
        setState(state => ({...state, esgotoURL: url}));
      });
    firebase
      .getRef()
      .child("rdg_meireles.json")
      .getDownloadURL()
      .then(url => {
        setState(state => ({...state, gasURL: url}));
      });
  }, []);

  return (
    <div style={{width: 360, minHeight: 700}} className="p-2 border">
      <div className="">
        <div className="">
          {/* <Search
            onSubmit={(el, index) => {
              console.log(
                "(recebido pelo Holder da search:)",
                JSON.stringify(el)
              );
              setEl(el);
              setIndex(index);
            }}
            interventions={interventions}
          /> */}
          <div className="border-bottom mb-2">
            {state.aguaURL && state.gasURL && state.esgotoURL ? (
              <Links state={state} />
            ) : (
              "Carregando Downloads..."
            )}
          </div>
          <div className="border pb-2 pt-2 pl-2">
            <div className="font-weight-bold">
              Redes de Infraestrutura Urbana
            </div>
            <div id="layerAgua">
              <input
                onClick={aguaChecked}
                className="mr-2"
                type="checkbox"
                id="checkAgua"
                defaultChecked
              />
              <span
                style={{
                  fontSize: 30,
                  color: "blue",
                  fontWeight: "bold"
                }}
              >
                -
              </span>
              Rede Água
            </div>
            <div id="layerGas">
              <input
                onClick={gasChecked}
                className="mr-2"
                type="checkbox"
                id="checkGas"
                defaultChecked
              />
              <span
                style={{
                  fontSize: 30,
                  color: "orange",
                  fontWeight: "bold"
                }}
              >
                -
              </span>
              Rede Gás
            </div>
            <div id="layerEsgoto">
              <input
                onClick={esgotoChecked}
                className="mr-2"
                type="checkbox"
                id="checkEsgoto"
                defaultChecked
              />
              <span
                style={{
                  fontSize: 30,
                  color: "green",
                  fontWeight: "bold"
                }}
              >
                -
              </span>
              Rede Esgoto
            </div>
          </div>

          {authority !== "none" ? (
            <div className="border p-2 mt-2">
              <a
                href="planejamento"
                onClick={e => {
                  e.preventDefault();
                  setVisiblePlanejamento(!visiblePlanejamento);
                }}
                style={{fontWeight: "bold"}}
              >
                Planejamentos de Intervenções [+]
              </a>
              <hr />

              {visiblePlanejamento && (
                <div className="border p-2">
                  <div id="planejamentosAgua">
                    <input
                      onClick={aguaPlanChecked}
                      className="mr-2"
                      type="checkbox"
                      id="checkPlanAgua"
                      defaultChecked
                    />
                    <span
                      style={{
                        fontSize: 30,
                        color: "blue",
                        fontWeight: "bold"
                      }}
                    >
                      <img
                        src={require("../../utils/images/flagBlue.png")}
                      />
                    </span>
                    Rede Água
                  </div>
                  <div id="planejamentosGas">
                    <input
                      onClick={gasPlanChecked}
                      className="mr-2"
                      type="checkbox"
                      id="checkPlanGas"
                      defaultChecked
                    />
                    <span
                      style={{
                        fontSize: 30,
                        color: "orange",
                        fontWeight: "bold"
                      }}
                    >
                      <img
                        src={require("../../utils/images/flagOrange.png")}
                      />
                    </span>
                    Rede Gás
                  </div>
                  <div id="planejamentosEsgoto">
                    <input
                      onClick={esgotoPlanChecked}
                      className="mr-2"
                      type="checkbox"
                      id="checkPlanEsgoto"
                      defaultChecked
                    />
                    <span
                      style={{
                        fontSize: 30,
                        color: "green",
                        fontWeight: "bold"
                      }}
                    >
                      <img
                        src={require("../../utils/images/flagGreen.png")}
                      />
                    </span>
                    Rede Esgoto
                  </div>
                </div>
              )}

              <hr />
              {/* gerencia de intervenções */}

              <div className="">
                <a
                  href="gerencia"
                  onClick={e => {
                    e.preventDefault();
                    setVisibleCadastrar(!visibleCadastrar);
                  }}
                  style={{fontWeight: "bold"}}
                >
                  Cadastro de Intervenções [+]
                </a>

                {visibleCadastrar && (
                  <div className="border p-2 mt-2">
                    <div>
                      {visibleCadastrar && (
                        <div id="cadastrar">
                          <Create
                            key={1}
                            onSubmit={obj => submitCreate(obj)}
                          />
                        </div>
                      )}

                      <hr />
                    </div>
                  </div>
                )}

                <hr />
                <div>
                  <div className="ml-auto">
                    {visibleAtualizar ? (
                      <div>
                        <div
                          onClick={() => toggleAtualizar()}
                          className="btn btn-danger mr-2"
                        >
                          -
                        </div>{" "}
                        <span className="font-weight-bold">
                          Atualizar Intervenção
                        </span>
                      </div>
                    ) : (
                      <div>
                        <div
                          onClick={() => toggleAtualizar()}
                          className="btn btn-secondary mr-2"
                        >
                          +
                        </div>{" "}
                        <span className="font-weight-bold">
                          Atualizar Intervenção
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                {visibleAtualizar &&
                  element &&
                  (element.responsable === authority ||
                  authority === "prefeitura" ? (
                    <div id="atualizar" className="container ">
                      <Update
                        el={element}
                        onSubmit={obj => submitUpdate(obj)}
                      />
                    </div>
                  ) : (
                    <div style={{color: "red"}} className="col-lg-10">
                      Desculpe, a autoridade responsável pela
                      intervenção é diferente da atual
                    </div>
                  ))}
                <hr />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Holder;

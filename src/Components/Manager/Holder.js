import React, {useContext, useState, useEffect} from "react";
import Create from "../../Components/Manager/Create";

import {FirebaseContext} from "../../Components/Firebase";

// import html2pdf from "html2pdf.js";
// import Search from "../Search";
import Update from "./Update";

import Links from "../Modall/Links";

// import { Container } from './styles';

const Holder = props => {
  let firebase = useContext(FirebaseContext);

  const {
    authority,
    type,
    index,
    toggleLayer,
    toggleLayerInterv,
    submitCreate
  } = props;

  let rede = [];

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

  const cageceChecked = () => {
    toggleLayerInterv("cagece");
  };
  const cegasChecked = () => {
    toggleLayerInterv("cegas");
  };
  const prefeituraChecked = () => {
    toggleLayerInterv("prefeitura");
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
    <div
      style={{minWidth: "28%", minHeight: 500}}
      className="p-2 border"
    >
      <div className="">
        <div className="">
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
              <img
                className="mr-2"
                src={require("../../utils/images/squareBlue.png")}
              />
              Rede de Distribuição de Água
            </div>
            <div id="layerGas">
              <input
                onClick={gasChecked}
                className="mr-2"
                type="checkbox"
                id="checkGas"
                defaultChecked
              />
              <img
                className="mr-2"
                src={require("../../utils/images/squareOrange.png")}
              />
              Rede de Distribuição de Gás Natural
            </div>
            <div id="layerEsgoto">
              <input
                onClick={esgotoChecked}
                className="mr-2"
                type="checkbox"
                id="checkEsgoto"
                defaultChecked
              />
              <img
                className="mr-2"
                src={require("../../utils/images/squareGreen.png")}
              />
              Rede Coletora de Esgoto
            </div>
          </div>

          {/* seção de planejmentos */}

          <div>
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

            {visiblePlanejamento && (
              <div className="border p-2">
                <div id="planejamentosAgua">
                  <input
                    onClick={cageceChecked}
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
                  Intervenções Rede Água
                </div>
                <div id="planejamentosGas">
                  <input
                    onClick={cegasChecked}
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
                  Intervenções Rede Gás
                </div>
                <div id="planejamentosEsgoto">
                  <input
                    onClick={prefeituraChecked}
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
                  Intervenções Rede Esgoto
                </div>
              </div>
            )}
          </div>

          {authority !== "none" ? (
            <div className="mt-2">
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
                            authority={authority}
                          />
                        </div>
                      )}

                      <hr />
                    </div>
                  </div>
                )}

                <hr />
              </div>
              <div>
                {visibleAtualizar &&
                  element &&
                  (element.responsable === authority ||
                  authority === "prefeitura" ? (
                    <div id="atualizar" className="container ">
                      {/* <Update
                        el={element}
                        onSubmit={obj => submitUpdate(obj)}
                      /> */}
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

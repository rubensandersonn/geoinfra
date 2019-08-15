import React, {useContext, useState, useEffect} from "react";
import Create from "../../Components/Manager/Create";

import {FirebaseContext} from "../../Components/Firebase";

// import html2pdf from "html2pdf.js";
// import Search from "../Search";

import Links from "../Modall/Links";

const Holder = props => {
  let firebase = useContext(FirebaseContext);

  const {
    authority,
    toggleLayer,
    toggleLayerInterv,
    submitCreate
  } = props;

  // const pretifyWindow = value => {
  //   if (value.constructor !== {}.constructor) {
  //     return "";
  //   }
  //   return Object.keys(value).map(keyy => (
  //     <div key={keyy}>
  //       <span style={{fontWeight: "bold"}}>{keyy}</span>:{" "}
  //       {value[keyy]}
  //     </div>
  //   ));
  // };

  const [visibleCadastrar, setVisibleCadastrar] = useState(false);

  // element chosen from search bar
  // const [element, setEl] = useState(null);
  // const [indexInterv, setIndex] = useState(null);

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
  const viarioChecked = () => {
    toggleLayer("esgoto");
  };

  const intervAguaChecked = () => {
    toggleLayerInterv("agua");
  };
  const intervGasChecked = () => {
    toggleLayerInterv("gas");
  };
  const intervEsgotoChecked = () => {
    toggleLayerInterv("esgoto");
  };
  const intervViarioChecked = () => {
    toggleLayerInterv("viario");
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
  }, [firebase]);

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
          <div className="border pb-2 pt-2 pl-2 mb-2">
            <div className="font-weight-bold">
              REDES DE INFRAESTRUTURA URBANA
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
                alt="imagem"
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
                alt="imagem"
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
                alt="imagem"
                className="mr-2"
                src={require("../../utils/images/squareGreen.png")}
              />
              Rede Coletora de Esgoto
            </div>
            <div id="layerViario">
              <input
                onClick={viarioChecked}
                className="mr-2"
                type="checkbox"
                id="checkViario"
                defaultChecked
              />
              <img
                alt="imagem"
                className="mr-2"
                src={require("../../utils/images/squareGray.png")}
              />
              Sistema Viário
            </div>
          </div>

          {/* intervenções */}

          <div className="border mt-2 pb-2 pt-2 pl-2 mb-2">
            <div className="font-weight-bold">
              PLANEJAMENTOS DE INTERVENÇÕES
            </div>
            <div id="planejamentosAgua">
              <input
                onClick={intervAguaChecked}
                className="mr-2"
                type="checkbox"
                id="checkAgua"
                defaultChecked
              />
              <img
                alt="imagem"
                src={require("../../utils/images/flagBlue.png")}
              />
              Rede de Distribuição de Água
            </div>
            <div id="planejamentosGas">
              <input
                onClick={intervGasChecked}
                className="mr-2"
                type="checkbox"
                id="checkGas"
                defaultChecked
              />
              <img
                alt="imagem"
                src={require("../../utils/images/flagOrange.png")}
              />
              Rede de Distribuição de Gás Natural
            </div>
            <div id="planejamentosEsgoto">
              <input
                onClick={intervEsgotoChecked}
                className="mr-2"
                type="checkbox"
                id="checkEsgoto"
                defaultChecked
              />
              <img
                alt="imagem"
                src={require("../../utils/images/flagGreen.png")}
              />
              Rede Coletora de Esgoto
            </div>
            <div id="planejamentosViario">
              <input
                onClick={intervViarioChecked}
                className="mr-2"
                type="checkbox"
                id="checkViario"
                defaultChecked
              />
              <img
                alt="imagem"
                src={require("../../utils/images/flagGray.png")}
              />
              Sistema Viário
            </div>
          </div>

          {authority !== "none" ? (
            <div className="mb-4 mt-2">
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
            </div>
          ) : (
            ""
          )}

          {/* legenda repetida */}
          <div className="border mt-4 p-2">
            <div style={{minWidth: 140}}>
              <div className="mt-4 font-weight-bold">LEGENDA</div>

              <div>
                <img
                  alt="imagem"
                  src={require("../../utils/images/squareSea.png")}
                />{" "}
                Oceano Atlântico
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holder;

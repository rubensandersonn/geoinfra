import React, {useState} from "react";
import Create from "../../Components/Manager/Create";
import SearchInterv from "../Search/SearchInterv";
import NoButton from "../Modall/NoButton";

// import {FirebaseContext} from "../../Components/Firebase";

// import html2pdf from "html2pdf.js";

import Links from "../Modall/Links";
import Delete from "./Delete";

const Holder = props => {
  // let firebase = useContext(FirebaseContext);

  const {
    authority,
    toggleLayer,
    toggleLayerInterv,
    submitCreate,
    submitDelete,
    interventions
  } = props;

  const [visibleCadastrar, setVisibleCadastrar] = useState(false);
  const [visibleRemover, setVisibleRemover] = useState(false);

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
    toggleLayer("viario");
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

  const [open, setOpen] = useState(false);
  const [chosenInterv, setChosen] = useState(null);

  const prettifyEl = el => (
    <div style={{maxWidth: "280px"}} className="border-left pl-2 m-2">
      <div className="p-2 border rounded">
        <span style={{fontWeight: "bold"}}>Endereço: </span>
        {el.endereco}
      </div>
      <div className="ml-2">
        <span style={{fontWeight: "bold"}}>Responsável: </span>
        {el.responsable}
      </div>
      <div className="ml-2">
        <span style={{fontWeight: "bold"}}>Descrição: </span>
        {el.description}
      </div>
      <div className="ml-2">
        <span style={{fontWeight: "bold"}}>data início: </span>
        {el.data1}
      </div>
      <div className="ml-2">
        <span style={{fontWeight: "bold"}}>data final: </span>
        {el.data2}
      </div>
    </div>
  );

  return (
    <div
      style={{minWidth: "28%", minHeight: 500}}
      className="ml-2 p-2 border"
    >
      <NoButton open={open} setOpen={setOpen} little={false}>
        {chosenInterv ? (
          <div>
            <h2 className="text-center">Intervenção</h2>
            <div>{prettifyEl(chosenInterv)}</div>
          </div>
        ) : (
          <div />
        )}
      </NoButton>
      <div className="">
        <div className="">
          <div className="border-bottom mb-2">
            <Links />
          </div>
          <div>
            {interventions &&
            interventions.constructor === {}.constructor ? (
              <SearchInterv
                onClick={(el, index) => {
                  console.log(el, index);
                  setChosen(el);
                  setOpen(true);
                }}
                interventions={interventions}
              />
            ) : (
              <div />
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
            <div className="mb-4 mt-4">
              {/* gerencia de intervenções */}

              <div className="ml-2">
                <a
                  href="gerencia"
                  onClick={e => {
                    e.preventDefault();
                    setVisibleCadastrar(!visibleCadastrar);
                  }}
                  style={{fontWeight: "bold"}}
                >
                  Cadastrar Intervenções
                </a>

                <div className="">
                  {visibleCadastrar && (
                    <div id="cadastrar">
                      <Create
                        key={1}
                        onSubmit={obj => submitCreate(obj)}
                        authority={authority}
                      />
                    </div>
                  )}
                </div>
              </div>
              <hr />
              <div className="ml-2">
                <a
                  href="remover"
                  onClick={e => {
                    e.preventDefault();
                    setVisibleRemover(!visibleRemover);
                  }}
                  style={{fontWeight: "bold"}}
                >
                  Deletar Intervenções
                </a>

                <div className="">
                  {visibleRemover && (
                    <div id="remover">
                      <Delete
                        onSubmit={submitDelete}
                        interventions={interventions}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* legenda repetida */}
          <div className="border p-2">
            <div style={{minWidth: 140}}>
              <div className="font-weight-bold">LEGENDA</div>

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

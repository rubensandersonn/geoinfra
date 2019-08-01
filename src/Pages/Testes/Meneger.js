import React, {useContext, useState, useEffect} from "react";
import Create from "../../Components/Manager/Create";

import AguaContext from "../../Context/AguaContext";
import EsgotoContext from "../../Context/EsgotoContext";
import GasContext from "../../Context/GasContext";
import {FirebaseContext} from "../../Components/Firebase";
import html2pdf from "html2pdf.js";

// import { Container } from './styles';

const Meneger = props => {
  let firebase = useContext(FirebaseContext);

  const {type, index} = props;
  const [objeto, setObject] = useState();
  const [operation, setOp] = useState("none");
  const [indexInterve, setIndex] = useState(-1);

  let rede = [];
  let [interventions, setInterventions] = useState([]);
  let [mapRemoveInterventions, setMapRemInterv] = useState([]);
  let authority = "none";
  const {agua, dispatchAgua} = useContext(AguaContext);
  const {esgoto, dispatchEsgoto} = useContext(EsgotoContext);
  const {gas, dispatchGas} = useContext(GasContext);

  // setting the right context
  if (type === "agua") {
    rede = agua;

    authority = "cagece";
  } else if (type === "esgoto") {
    rede = esgoto;

    authority = "cagece";
  } else if (type === "gas") {
    rede = gas;

    authority = "cegas";
  }

  // console.log("(Meneger) rede[key]", rede[index]);
  // console.log("(Meneger) key", index);
  // console.log("(Meneger) type", type);
  // console.log("(Meneger) authority", authority);

  let [mapaRede, setMapaRede] = useState(() => {
    console.log("...");
  });

  let [mapaIntervencoes, setMapInt] = useState(() => {});
  let [screenToShow, setScreen] = useState("cadastrar");

  //
  // === quando index e type estiverem definidos

  useEffect(() => {}, [interventions]);

  useEffect(() => {
    if (index && type) {
      firebase
        .getIntervRef(type)
        .child(index)
        .on("value", snap => {
          if (snap && snap.val()) {
            console.log("recebidos:", snap.val());

            interventions = snap.val();

            console.log("intervenções: ", interventions);
            setMapInt(
              interventions.map((el, indexxx) => (
                <div key={indexxx}>
                  <hr />
                  (index: {indexxx}){pretifyWindow(el)}
                  <hr />
                </div>
              ))
            );

            setMapRemInterv(
              interventions.map((el, indexx) => {
                return (
                  <a
                    key={indexx}
                    onClick={e => {
                      e.preventDefault();
                      linkClicked(el, indexx);
                    }}
                    href={indexx}
                  >
                    {prettifyEl(el)}
                  </a>
                );
              })
            );

            setMapaRede(el => el);
          } else {
            console.log("intervenções: ", interventions);
            console.log("(useEffect) dados do firebase vazios");
          }
        });
    }
  }, [index, type]);

  // === drop thisng ===

  let [chosen, setChosen] = React.useState(<div />);
  let [indexChosen, setIndexChosen] = React.useState(-1);

  const prettifyEl = el => (
    <div className="border-left pl-2 m-2">
      <div>
        <span style={{fontWeight: "bold"}}>Responsável: </span>
        {el.responsable}
      </div>
      <div>
        <span style={{fontWeight: "bold"}}>Descrição: </span>
        {el.description}
      </div>
      <div>
        <span style={{fontWeight: "bold"}}>data início: </span>
        {el.data1}
      </div>
      <div>
        <span style={{fontWeight: "bold"}}>data fim: </span>
        {el.data2}
      </div>
    </div>
  );

  const linkClicked = (el, indexx) => {
    document.getElementById("chosen").style.display = "block";
    setChosen(prettifyEl(el));
    setIndexChosen(indexx);
    indexChosen = indexx;
    console.log("link clicked", el, indexx, indexChosen);
  };

  //

  const [result, setResult] = useState(null);

  //
  // === MOST IMPORTANT EFFECT ===
  //

  const submitCreate = obj => {
    obj.responsable = authority;
    // console.log("submited create: ", obj);

    let novo = interventions;
    novo.push(obj);

    firebase.doCreateIntervention(index, type, novo);
  };

  const submitUpdate = (obj, indexInterv) => {
    obj.responsable = authority;

    let novo = interventions;
    novo.push(obj);

    firebase.doUpdateIntervention(index, type, novo);
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

  const buttonClicked = who => {
    let divv;
    switch (who) {
      case "cadastrar": {
        setScreen("cadastrar");
        break;
      }

      case "remover": {
        setScreen("remover");
        break;
      }
      default: {
        console.log("erro no button clicked");
        break;
      }
    }

    // document.getElementById("cadastrar").style.display = "none";
    // document.getElementById("atualizar").style.display = "none";
    // document.getElementById("remover").style.display = "none";
    // document.getElementById(divv).style.display = "block";
    // document.getElementById("titulo").innerHTML =
    //   divv.charAt(0).toUpperCase() + divv.slice(1) + " Intervenção";
  };

  const downloadReport = () => {
    var div1 = document.createElement("div1");
    div1.innerHTML =
      '<div className="container"><div className="block-heading-1"><h2>Relatório</h2></div></div>';

    var div2 = document.createElement("div2");

    const gambs = () => (
      <div>{pretifyWindow(rede[index].properties)}</div>
    );

    div2.innerHTML =
      "<div>" + pretifyWindow(rede[index].properties) + "</div>";

    div1.appendChild(div2);

    html2pdf(document.getElementById("props"));
  };

  return (
    <>
      {/* ===
          header
          ===
       */}
      <div>
        <div className="col-lg-12 text-center mb-4">
          <div className="block-heading-1">
            <h2 id="titulo">Cadastrar Intervenção</h2>
          </div>
          <div className="border-bottom rounded p-2 m-2">
            <div
              className="btn btn-secondary ml-2 mr-2 pl-2 pr-2"
              onClick={() => buttonClicked("cadastrar")}
            >
              Criar
            </div>

            <div
              className="btn btn-secondary ml-2 mr-2 pl-2 pr-2"
              onClick={() => buttonClicked("remover")}
            >
              Remover
            </div>
            <div
              className="btn btn-secondary ml-2 mr-2 pl-2 pr-2"
              onClick={() => downloadReport()}
            >
              Baixar Relatório
            </div>
          </div>
        </div>
      </div>
      {/* ===
          body
          ===
       */}
      <div className="row">
        <div className="col-lg-6 border-right ml-auto">
          <div className="pt-4 pl-2 ml-2" id="props">
            <div className="block-heading-1">
              <h3 id="titulo">Relatório</h3>
            </div>
            <p className="border rounded">Intervenções: </p>
            {mapaIntervencoes}
            <p className="border rounded">Propriedades: </p>
            {rede[index] && pretifyWindow(rede[index].properties)}
          </div>
        </div>
        {screenToShow === "cadastrar" ? (
          <div id="cadastrar" className="col-lg-6 mb-5">
            <Create key={1} onSubmit={obj => submitCreate(obj)} />
          </div>
        ) : (
          <div
            id="remover"
            key="remover"
            // style={{display: "none"}}
            className="col-lg-6 mb-5"
          >
            {/* aqui */}
            <div className="newdropdown">
              {/* <button className="newdropbtn">Dropdown</button> */}
              <div className="newdropbtn border rounded">
                Intervenções
              </div>
              <div className="newdropdown-content">
                {mapRemoveInterventions}
              </div>
            </div>
            <div id="chosen" style={{display: "none"}}>
              <div className="container  p-2 m-2">{chosen}</div>
              <div
                className="btn btn-danger p-2 m-2 ml-auto"
                onClick={e => {
                  e.preventDefault();
                  submitDelete(indexChosen);
                  document.getElementById("chosen").style.display =
                    "none";
                }}
              >
                Excluir Intervenção
              </div>
            </div>
            {/* aqui */}
          </div>
        )}
      </div>
    </>
  );
};

export default Meneger;

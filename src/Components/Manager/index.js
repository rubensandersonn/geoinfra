import React, {useContext, useState, useEffect} from "react";
import Create from "../../Components/Manager/Create";

import AguaContext from "../../Context/AguaContext";
import EsgotoContext from "../../Context/EsgotoContext";
import GasContext from "../../Context/GasContext";
import {FirebaseContext} from "../../Components/Firebase";
import html2pdf from "html2pdf.js";

// import { Container } from './styles';

const Manager = props => {
  let firebase = useContext(FirebaseContext);

  const {authority, type, index} = props;

  let rede = [];
  let [interventions, setInterventions] = useState([]);
  let [mapRemoveInterventions, setMapRemInterv] = useState([]);

  // console.log("(Manager) rede[key]", rede[index]);
  // console.log("(Manager) key", index);
  // console.log("(Manager) type", type);
  // console.log("(Manager) authority", authority);

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
            console.log(
              "(Manager) intervenções recebidos:",
              snap.val()
            );

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

    let novo = interventions ? interventions : [];
    novo.push(obj);

    //
    firebase.doCreateIntervention(novo);
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

  const [visibleCadastrar, setVisibleCadastrar] = useState(false);

  const toggleCadastrar = () => {
    setVisibleCadastrar(!visibleCadastrar);
  };

  return (
    <>
      <div className="col-lg-12 ">
        <div className="col-lg-12">
          {/* <div className="block-heading-1">
            <h2 id="titulo">Cadastrar Intervenção</h2>
          </div> */}

          <div className="ml-2">
            <div className="ml-auto">
              {visibleCadastrar ? (
                <div>
                  <div
                    onClick={() => toggleCadastrar()}
                    className="btn btn-danger mr-2"
                  >
                    -
                  </div>{" "}
                  Cadastrar Intervenção
                </div>
              ) : (
                <div>
                  <div
                    onClick={() => toggleCadastrar()}
                    className="btn btn-secondary mr-2"
                  >
                    +
                  </div>{" "}
                  Cadastrar Intervenção
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ===
          body
          ===
       */}
      <div>
        {visibleCadastrar && (
          <div id="cadastrar" className="container ">
            <Create key={1} onSubmit={obj => submitCreate(obj)} />
          </div>
        )}
        <hr />
      </div>
    </>
  );
};

export default Manager;

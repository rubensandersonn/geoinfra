import React, {useContext, useState, useEffect} from "react";
import Create from "../../Components/Manager/Create";
import Delete from "../../Components/Manager/Delete";
import Update from "../../Components/Manager/Update";
import AguaContext from "../../Context/AguaContext";
import EsgotoContext from "../../Context/EsgotoContext";
import GasContext from "../../Context/GasContext";
import {FirebaseContext} from "../../Components/Firebase";
import html2pdf from "html2pdf.js";

// import { Container } from './styles';

const Menage = props => {
  let firebase = useContext(FirebaseContext);

  const {type, index} = props;
  const [objeto, setObject] = useState();
  const [operation, setOp] = useState("none");
  const [indexInterve, setIndex] = useState(-1);

  let rede = [];
  let dispatch = () => {};
  let authority = "none";
  const {agua, dispatchAgua} = useContext(AguaContext);
  const {esgoto, dispatchEsgoto} = useContext(EsgotoContext);
  const {gas, dispatchGas} = useContext(GasContext);

  // setting the right context
  if (type === "agua") {
    rede = agua;
    dispatch = dispatchAgua;
    authority = "cagece";
  } else if (type === "esgoto") {
    rede = esgoto;
    dispatch = dispatchEsgoto;
    authority = "cagece";
  } else if (type === "gas") {
    rede = gas;
    dispatch = dispatchGas;
    authority = "cegas";
  }

  // console.log("(Menage) rede[key]", rede[index]);
  // console.log("(Menage) key", index);
  // console.log("(Menage) type", type);
  // console.log("(Menage) authority", authority);

  let [mapaTOP, setMapa] = useState(() => {
    console.log("...");
  });

  const setFirebaseResult = async (i, t) => {
    return new Promise(resolve => {
      firebase
        .doReadInterventions(i, t)
        .then(res => {
          if (res) {
            console.log("pegou do firebase:", res);
            resolve(res);
          } else {
            console.log("pegou nulo firebase:", res);
            resolve([]);
          }
        })
        .catch(err => {
          console.log("(setFirebaseResult) erro:", err);
          resolve([]);
        });
    });
  };

  const extractFirebaseResult = dude => {
    let res = [];
    Object.keys(dude).map(key => {
      res.push(dude[key]);
    });
    // console.log("extracted: ", res);
    return res;
  };

  const [result, setResult] = useState(null);

  useEffect(() => {
    if (
      type &&
      index &&
      rede[index] &&
      !rede[index].properties.interventions
    ) {
      console.log("(menage) ao começar:", type, index);
      setFirebaseResult(index, type)
        .then(res => {
          rede[
            index
          ].properties.interventions = extractFirebaseResult(res);
          setMapa(
            rede[index].properties.interventions.map((interv, k) => {
              return <div key={k}>{JSON.stringify(interv)}</div>;
            })
          );
        })
        .catch(err => {
          console.log("erro ao pegar intervenções do firebase:", err);
        });
    }
  }, [type, index]);

  //
  // === MOST IMPORTANT EFFECT ===
  //

  useEffect(() => {
    switch (operation) {
      case "create": {
        if (rede[index]) {
          if (!rede[index].properties.interventions) {
            console.log("(create) no interventions... creating");
            if (objeto) {
              rede[index].properties.interventions = [objeto];
              firebase.doCreateIntervention(index, type, 0, objeto);
            } else {
              console.log("(create) no objeto to insert");
            }
          } else {
            if (objeto) {
              rede[index].properties.interventions.push(objeto);
              firebase.doCreateIntervention(
                index,
                rede[index].properties.interventions.lenght - 1,
                type,
                objeto
              );
            }
          }
        } else {
          console.log("erro");
        }
        break;
      }
      case "update": {
        if (rede[index]) {
          if (!rede[index].properties.interventions) {
            console.log("(update) no interventions");
            if (objeto) {
              rede[index].properties.interventions = [objeto];
              firebase.doCreateIntervention(index, type, objeto);
            }
          } else {
            if (objeto) {
              if (indexInterve != -1) {
                rede[index].properties.interventions[
                  indexInterve
                ] = objeto;

                firebase.doUpdateIntervention(
                  index,
                  type,
                  indexInterve,
                  objeto
                );
              } else {
                console.log("(update) no index to upd");
              }
            } else {
              console.log("(update) no object to upd");
            }
          }
        } else {
          console.log("erro");
        }
        break;
      }
      case "delete": {
        if (rede[index]) {
          if (rede[index].properties.interventions) {
            if (indexInterve != -1) {
              const ell = rede[index].properties.interventions.splice(
                indexInterve,
                1
              );
              firebase.doDeleteIntervention(
                index,
                type,
                indexInterve
              );
            } else {
              console.log("(delete) no index to delete");
            }
          } else {
            console.log("(delete) no interventions");
          }
        } else {
          console.log("erro no arquivo");
        }
        break;
      }
    }
    // ISSO É O QUE FAZ ELE ATUALIZAR!!!!!!!!!!
    if (rede[index] && rede[index].properties) {
      if (!rede[index].properties.interventions) {
        rede[index].properties.interventions = [];
      }

      setMapa(
        rede[index].properties.interventions.map((interv, k) => {
          return <div key={k}>{JSON.stringify(interv)}</div>;
        })
      );
    }
  }, [rede]);

  const submitUpdate = (obj, indexInterv) => {
    obj.responsable = authority;
    // console.log("submited update: ", obj, indexInterv);
    setObject(obj);
    setIndex(indexInterv);
    setOp("update");
    dispatch({
      type: "update-intervention",
      value: obj,
      index: index,
      indexInterv
    });
  };

  const submitCreate = obj => {
    obj.responsable = authority;
    // console.log("submited create: ", obj);
    setOp("create");
    setObject(obj);
    dispatch({
      type: "create-intervention",
      index: index,
      value: obj
    });
    // firebase.doCreateIntervention()
  };

  const submitDelete = (indexx, indexInterv) => {
    // console.log("submited delete: ", indexInterv);
    setOp("delete");
    setIndex(indexInterv);
    setObject(null);

    dispatch({
      type: "delete-intervention",
      index: indexx,
      indexInterv
    });

    // firebase.doDeleteIntervention(
    //   index,
    //   type,
    //   indexInterve
    // );
  };

  const pretifyInterv = value => {
    const mapp = Object.keys(value).map(key => {
      return (
        <>
          <span style={{fontWeight: "bold"}}>
            {key.replace(/_/gm, " ")}
          </span>
          {": "}
          {value[key] ? value[key] : ""}

          <br />
        </>
      );
    });

    return mapp;
  };
  const pretifyWindow = value => {
    const mapp = Object.keys(value).map(key => {
      if (!key.match(/id|x|y/gm)) {
        return (
          <>
            <span style={{fontWeight: "bold"}}>
              {key.replace(/_/gm, " ")}
            </span>
            {": "}
            {value[key] &&
            value[key].constructor === [].constructor ? (
              <div>
                {value[key].map((el, indexx) => (
                  <a
                    onClick={e => e.preventDefault()}
                    href="intervention"
                  >
                    <div key={indexx}> - {pretifyInterv(el)} -</div>
                  </a>
                ))}
              </div>
            ) : (
              <a onClick={e => e.preventDefault()} href="value">
                {value[key]}
              </a>
            )}

            <br />
          </>
        );
      }
      return null;
    });

    return mapp;
  };

  const buttonClicked = who => {
    let divv;
    switch (who) {
      case "cadastrar": {
        divv = "cadastrar";
        break;
      }
      case "atualizar": {
        divv = "atualizar";
        break;
      }
      case "remover": {
        divv = "remover";
        break;
      }
      default: {
        console.log("erro no button clicked");
        break;
      }
    }

    document.getElementById("cadastrar").style.display = "none";
    document.getElementById("atualizar").style.display = "none";
    document.getElementById("remover").style.display = "none";
    document.getElementById(divv).style.display = "block";
    document.getElementById("titulo").innerHTML =
      divv.charAt(0).toUpperCase() + divv.slice(1) + " Intervenção";
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
      <div class="">
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
              onClick={() => buttonClicked("atualizar")}
            >
              Atualizar
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

      <div className="row">
        <div className="col-lg-6 border-right ml-auto">
          <div id="props">
            <div className="block-heading-1">
              <h3 id="titulo">Relatório</h3>
            </div>
            {rede[index] && pretifyWindow(rede[index].properties)}
          </div>
        </div>
        <div id="cadastrar" className="col-lg-6 mb-5">
          <Create onSubmit={obj => submitCreate(obj)} />
        </div>
        <div
          id="atualizar"
          style={{display: "none"}}
          className="col-lg-6 mb-5"
        >
          <Update
            interventions={
              rede[index] && rede[index].properties.interventions
                ? rede[index].properties.interventions
                : []
            }
            onSubmit={(obj, indexInterv) =>
              submitUpdate(obj, indexInterv)
            }
          />
        </div>
        <div
          id="remover"
          style={{display: "none"}}
          className="col-lg-6 mb-5"
        >
          <Delete
            interventions={
              rede[index] &&
              rede[index].properties &&
              rede[index].properties.interventions
                ? rede[index].properties.interventions
                : []
            }
            onSubmit={indexInterv => submitDelete(index, indexInterv)}
          />
        </div>
      </div>
    </>
  );
};

export default Menage;

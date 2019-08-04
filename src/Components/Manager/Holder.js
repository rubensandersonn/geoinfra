import React, {useContext, useState, useEffect} from "react";
import Create from "../../Components/Manager/Create";

import {FirebaseContext} from "../../Components/Firebase";

import html2pdf from "html2pdf.js";
import Search from "../Search";

// import { Container } from './styles';

const Holder = props => {
  let firebase = useContext(FirebaseContext);

  const {authority, type, index} = props;

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

  const [visibleCadastrar, setVisibleCadastrar] = useState(false);
  const [visibleAtualizar, setVisibleAtualizar] = useState(false);

  const toggleCadastrar = () => {
    setVisibleCadastrar(!visibleCadastrar);
  };
  const toggleAtualizar = () => {
    setVisibleAtualizar(!visibleAtualizar);
  };

  return (
    <>
      <div className="col-lg-12 ">
        <div className="col-lg-12">
          {/* <div className="block-heading-1">
            <h2 id="titulo">Cadastrar Intervenção</h2>
          </div> */}
          <Search interventions={interventions} />
          <hr />

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
          <hr />
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
                  Atualizar Intervenção
                </div>
              ) : (
                <div>
                  <div
                    onClick={() => toggleAtualizar()}
                    className="btn btn-secondary mr-2"
                  >
                    +
                  </div>{" "}
                  Atualizar Intervenção
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

export default Holder;

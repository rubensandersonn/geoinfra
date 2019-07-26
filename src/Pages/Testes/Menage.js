import React, {useContext, useState, useEffect} from "react";
import Create from "../../Components/Manager/Create";
import Delete from "../../Components/Manager/Delete";
import Update from "../../Components/Manager/Update";
import AguaContext from "../../Context/AguaContext";
import EsgotoContext from "../../Context/EsgotoContext";
import GasContext from "../../Context/GasContext";

// import { Container } from './styles';

const Menage = props => {
  const {type, index} = props;
  const [objeto, setObject] = useState();

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
  } else {
    console.log("erro ao pegar o tipo: ", type);
  }

  console.log("(Menage) rede[key]", rede[index]);
  console.log("(Menage) key", index);
  console.log("(Menage) type", type);
  console.log("(Menage) authority", authority);

  let [mapaTOP, setMapa] = useState(() => {
    console.log("NÃO APAGAR");
  });

  useEffect(() => {
    console.log("agua mudou");
    if (agua[index]) {
      if (!agua[index].properties.interventions) {
        if (objeto) {
          agua[index].properties.interventions = [objeto];
        }
      } else {
        if (objeto) {
          agua[index].properties.interventions.push(objeto);
        }
      }
      // ISSO É O QUE FAZ ELE ATUALIZAR!!!!!!!!!!
      setMapa(
        agua[index].properties.interventions.map((interv, k) => {
          return <div key={k}>{JSON.stringify(interv)}</div>;
        })
      );
    } else {
      console.log("oloco bixo!!! deu errado meu");
    }
  }, [agua]);

  const submitUpdate = (obj, indexInterv) => {
    console.log("submited update: ", obj, indexInterv);
    obj.responsable = authority;
    dispatch({
      type: "update-intervention",
      value: obj,
      index: index,
      indexInterv
    });
  };

  const submitCreate = obj => {
    console.log("submited create: ", obj);
    setObject(obj);
    dispatchAgua({
      type: "create-intervention",
      index: index,
      value: {cuzim: "gostoso"}
    });
  };

  const submitDelete = indexInterv => {
    console.log("submited delete: ", indexInterv);

    dispatch({
      type: "delete-intervention",
      index: index,
      indexInterv
    });
  };

  const pretifyWindow = value => {
    const mapp = Object.keys(value).map(key => {
      // if (!key.match(/id|x|y/gm)) {
      if (true) {
        return (
          <p className="text-black">
            <span style={{fontWeight: "bold"}}>
              {key.replace(/_/gm, " ")}
            </span>
            {": "}
            {value[key] &&
            value[key].constructor === [].constructor ? (
              <div>
                [
                {value[key].map((el, indexx) => (
                  <div key={indexx}> - {pretifyWindow(el)} -</div>
                ))}
                ]
              </div>
            ) : (
              value[key]
            )}
          </p>
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
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 border-right ml-auto">
          {rede[index] && pretifyWindow(rede[index].properties)}
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
              rede && rede.properties && rede.properties.interventions
                ? rede.properties.interventions
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
              rede && rede.properties && rede.properties.interventions
                ? rede.properties.interventions
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

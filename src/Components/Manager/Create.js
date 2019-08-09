import React, {useReducer, useState, useEffect} from "react";
import {
  validateAdress,
  validateNumber,
  validateDate
} from "../Validators";
import LocationSearchInput from "../Search/LocationSearchInput";

const reducer = (state, action) => {
  switch (action.type) {
    case "description":
      return {...state, description: action.description};
    case "data1":
      return {...state, data1: action.data1};
    case "data2":
      return {...state, data2: action.data2};

    case "tipo_rede":
      return {...state, tipo_rede: action.tipo_rede};
    case "endereco":
      return {...state, endereco: action.endereco};
    case "coordinates":
      return {...state, coordinates: action.coordinates};
    default:
      return state;
  }
};

const Create = props => {
  const {onSubmit, authority} = props;
  const [
    {description, endereco, data1, data2, coordinates, tipo_rede},
    dispatch
  ] = useReducer(reducer, {
    endereco: "",
    description: "",
    coordinates: {lat: 0, lng: 0},
    data1: "",
    data2: "",
    tipo_rede: "none"
  });

  const [validEndereco, setValidEndereco] = useState(true);
  const [validData1, setValidData1] = useState(true);
  const [validData2, setValidData2] = useState(true);
  const [validNumber1, setValidNumber1] = useState(true);
  const [validNumber2, setValidNumber2] = useState(true);

  const [mapErrors, setMapErrors] = useState(() => {});
  const [successMsg, setSuccessMsg] = useState();

  useEffect(() => {
    let msgError = {
      msgData1: validData1 ? null : "Data Inicial Inválida",
      msgData2: validData2 ? null : "Data Final Inválida"
    };

    setMapErrors(
      Object.keys(msgError).map(key => {
        if (msgError[key] !== null) {
          return (
            <div
              key={key}
              className="border-bottom rounded p-2"
              style={{color: "#8B0000"}}
            >
              {msgError[key]}
            </div>
          );
        }

        return <div key={key} />;
      })
    );

    // console.log("mensagens de erro:", msgError);
  }, [validData1, validData2]);

  const isIntervalFree = (data1, data2) => {
    return true; // in construction
  };

  // === === dropdown === ===

  const [visibleDropdown, setVisibleDropdown] = useState(false);

  let choices = [];

  if (authority === "prefeitura") {
    choices = ["água", "gás", "esgoto"];
  } else if (authority === "cagece") {
    choices = ["água", "esgoto"];
  } else {
    choices = ["gás"];
  }

  const flagBlue = require("../../utils/images/flagBlue.png");
  const flagGreen = require("../../utils/images/flagGreen.png");
  const flagOrange = require("../../utils/images/flagOrange.png");

  const [chosen, setChosen] = useState("none");

  const mapChoices = choices.map((tipo_rede, index) => {
    return (
      <div
        className="border"
        style={{cursor: "pointer"}}
        onClick={() => {
          dispatch({type: "tipo_rede", tipo_rede: tipo_rede});
          console.log("escolhido:", tipo_rede);
          document.getElementById("dropdown").innerText = tipo_rede;
        }}
        key={index}
      >
        <div>
          <img
            src={
              tipo_rede === "água"
                ? flagBlue
                : tipo_rede === "gás"
                ? flagOrange
                : flagGreen
            }
          />
          {tipo_rede}
        </div>
      </div>
    );
  });

  return (
    <div className=" pt-6">
      <div className="rounded mb-2">{mapErrors}</div>
      <div className="mb-2" style={{color: "green"}}>
        {successMsg}
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();
          if (
            validData1 &&
            validData2 &&
            validEndereco &&
            validNumber1 &&
            validNumber2 &&
            tipo_rede !== "none" &&
            isIntervalFree(data1, data2)
          ) {
            const nova = {
              description,
              data1,
              data2,
              coordinates,
              endereco,
              tipo_rede
            };
            //mandando os dados para fora
            onSubmit(nova);

            dispatch({type: "description", description: ""});
            dispatch({type: "data1", data1: ""});
            dispatch({type: "data2", data2: ""});
            dispatch({type: "endereco", endereco: ""});
            dispatch({type: "tipo_rede", tipo_rede: ""});
            dispatch({
              type: "coordinates",
              coordinates: {lat: 0, lng: 0}
            });

            setSuccessMsg("Cadastro realizado com sucesso!");
            // console.log("sucesso!", description, data1, data2);
          }
        }}
      >
        <div className="form-group row">
          <div className="col-md-10 mb-4 mb-lg-0">
            {/* <input
              className="form-control border"
              type="text"
              value={endereco}
              onChange={e =>
                dispatch({type: "endereco", endereco: e.target.value})
              }
              onBlur={() => {
                setValidEndereco(validateAdress(endereco));
              }}
              placeholder="Endereço (ex: 'Rua Tal, 58')"
              name="endereco"
              required
            /> */}
            <LocationSearchInput
              onSelect={(latLng, address) => {
                console.log(
                  "recebido pelo create: ",
                  latLng,
                  address
                );
                dispatch({type: "endereco", endereco: address});
                dispatch({type: "coordinates", coordinates: latLng});
              }}
            />
          </div>
        </div>

        {/* description */}
        <div className="form-group row">
          <div className="col-md-10 mb-4 mb-lg-0">
            <textarea
              rows="3"
              cols="30"
              className="form-control border"
              value={description}
              onChange={e =>
                dispatch({
                  type: "description",
                  description: e.target.value
                })
              }
              placeholder="Descrição..."
              name="description"
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-5 mb-4 mb-lg-0">
            <div
              style={{cursor: "pointer"}}
              onClick={() => setVisibleDropdown(!visibleDropdown)}
            >
              <p id="dropdown" className="border rounded">
                Tipo de Rede...
              </p>
            </div>

            {visibleDropdown && (
              <div
                onClick={() => setVisibleDropdown(!visibleDropdown)}
                className="border"
              >
                {mapChoices}
              </div>
            )}
          </div>
        </div>

        {/* datas */}
        <div className="form-group row">
          <div className="col-md-5 mb-4 mb-lg-0">
            <input
              className="form-control border"
              type="text"
              value={data1}
              onChange={e =>
                dispatch({type: "data1", data1: e.target.value})
              }
              onBlur={() => {
                setValidData1(validateDate(data1));
              }}
              placeholder="Data inicial (dd/mm/aa)"
              name="data1"
              required
            />
          </div>
          <div className="col-md-5 mb-4 mb-lg-0">
            <input
              className="form-control border"
              type="text"
              value={data2}
              onChange={e =>
                dispatch({type: "data2", data2: e.target.value})
              }
              onBlur={() => {
                setValidData2(validateDate(data2));
              }}
              placeholder="Data inicial (dd/mm/aa)"
              name="data2"
              required
            />
          </div>
        </div>

        {/* submit */}
        <div className="form-group row">
          <div className="col-md-10 ml-auto">
            <input
              className="btn btn-secondary text-white py-3 px-5"
              type="submit"
              value="Submit"
              disabled={!(validData1 && validData2)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;

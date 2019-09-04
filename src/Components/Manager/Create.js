import React, {useReducer, useState, useEffect} from "react";
import {validateDate} from "../Validators";
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

  const [validData1, setValidData1] = useState(true);
  const [validData2, setValidData2] = useState(true);

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
  }, [validData1, validData2]);

  const isIntervalFree = (data1, data2) => {
    return true; // in construction
  };

  // === === dropdown === ===

  const [visibleDropdown, setVisibleDropdown] = useState(false);

  // choices: sistema viário , rede água , rede esgoto , rede gás
  let choices = [];

  if (authority === "prefeitura") {
    choices = ["sistema viário"];
  } else if (authority === "cagece") {
    choices = ["rede água", "rede esgoto"];
  } else {
    choices = ["rede gás"];
  }

  const flagBlue = require("../../utils/images/flagBlue.png");
  const flagGreen = require("../../utils/images/flagGreen.png");
  const flagOrange = require("../../utils/images/flagOrange.png");
  const flagGray = require("../../utils/images/flagGray.png");

  // const [chosen, setChosen] = useState("none");

  const mapChoices = choices.map((tipo_rede, index) => {
    return (
      <div
        style={{
          cursor: "pointer",
          boxShadow: "1px 1px 2px #8f8f8f"
        }}
        className="ml-2 rounded"
        onClick={() => {
          dispatch({type: "tipo_rede", tipo_rede: tipo_rede});

          document.getElementById("dropdown").innerText = tipo_rede;
        }}
        key={index}
      >
        <div className="text-left">
          <img
            alt="icone rede"
            src={
              tipo_rede === "rede água"
                ? flagBlue
                : tipo_rede === "sistema viário"
                ? flagGray
                : tipo_rede === "rede gás"
                ? flagOrange
                : flagGreen
            }
          />
          <span className="text-black">{tipo_rede}</span>
        </div>
      </div>
    );
  });

  return (
    <div className="p-2 border" style={{maxWidth: "310px"}}>
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
          <div className="col-lg-12">
            <LocationSearchInput
              onSelect={(latLng, address) => {
                dispatch({type: "endereco", endereco: address});
                dispatch({type: "coordinates", coordinates: latLng});
              }}
            />
          </div>
        </div>

        {/* description */}
        <div className="form-group row ml-auto">
          <div className="">
            <textarea
              rows="3"
              cols="34"
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

        <div className="col-lg-8 ml-auto">
          <div
            style={{
              cursor: "pointer",
              boxShadow: "1px 1px 2px #888888"
            }}
            onClick={() => setVisibleDropdown(!visibleDropdown)}
          >
            <div
              style={{fontStyle: "italic"}}
              id="dropdown"
              className="mb-2 text-center"
            >
              Tipo de Rede...
            </div>
          </div>

          {visibleDropdown && (
            <div
              onClick={() => setVisibleDropdown(!visibleDropdown)}
              className="rounded mb-4 border-left"
            >
              {mapChoices}
            </div>
          )}
        </div>

        {/* datas */}

        <div className="form-group row ">
          <input
            className="form-control border col-lg-10 ml-4"
            type="text"
            value={data1}
            onChange={e =>
              dispatch({type: "data1", data1: e.target.value})
            }
            onBlur={() => {
              setValidData1(validateDate(data1));
            }}
            placeholder="Data inicial (dd/mm/aaaa)"
            name="data1"
            required
          />
        </div>
        <div className="form-group row ">
          <input
            className="form-control border col-lg-10 ml-4"
            type="text"
            value={data2}
            onChange={e =>
              dispatch({type: "data2", data2: e.target.value})
            }
            onBlur={() => {
              setValidData2(validateDate(data2));
            }}
            placeholder="Data Término (dd/mm/aaaa)"
            name="data2"
            required
          />
        </div>

        {/* submit */}
        <div className="form-group row mr-4">
          <div className="ml-auto">
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

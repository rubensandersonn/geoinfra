import React, {useReducer, useState, useEffect} from "react";
import {
  validateAdress,
  validateNumber,
  validateDate
} from "../Validators";

const reducer = (state, action) => {
  switch (action.type) {
    case "rua":
      return {...state, rua: action.rua};
    case "numero1":
      return {...state, numero1: action.numero1};
    case "numero2":
      return {...state, numero2: action.numero2};
    case "data1":
      return {...state, data1: action.data1};
    case "data2":
      return {...state, data2: action.data2};
    default:
      return state;
  }
};

const CadForm = props => {
  const [
    {rua, numero1, numero2, data1, data2},
    dispatch
  ] = useReducer(reducer, {
    rua: "",
    numero1: "",
    numero2: "",
    data1: "",
    data2: ""
  });

  const [validData1, setValidData1] = useState(true);
  const [validData2, setValidData2] = useState(true);
  const [validNumero1, setValidNumero1] = useState(true);
  const [validNumero2, setValidNumero2] = useState(true);

  const [mapErrors, setMapErrors] = useState(() => {});
  const [successMsg, setSuccessMsg] = useState();

  useEffect(() => {
    let msgError = {
      msgData1: validData1 ? null : "Data Inicial Inválida",
      msgData2: validData2 ? null : "Data Final Inválida",
      msgNumero1: validNumero1 ? null : "Número Inicial Inválido",
      msgNumero2: validNumero2 ? null : "Número Final Inválido"
    };

    setMapErrors(
      Object.keys(msgError).map(key => {
        console.log(".");
        if (msgError[key] !== null) {
          return <div style={{color: "red"}}>{msgError[key]}</div>;
        }

        return <></>;
      })
    );

    console.log("mensagens de erro:", msgError);
  }, [validData1, validData2, validNumero1, validNumero2]);

  return (
    <div className="modal-body pt-6">
      <div className="modal-header">
        <h5 className="modal-title text-black" id="exampleModalLabel">
          {props.title}
        </h5>
      </div>

      {mapErrors}
      <div style={{color: "green"}}>{successMsg}</div>

      <form
        onSubmit={e => {
          e.preventDefault();
          if (
            validData1 &&
            validData2 &&
            validNumero1 &&
            validNumero2
          ) {
            props.onSubmit({rua, numero1, numero2, data1, data2});

            dispatch({type: "rua", rua: ""});
            dispatch({type: "numero1", numero1: ""});
            dispatch({type: "numero2", numero2: ""});
            dispatch({type: "data1", data1: ""});
            dispatch({type: "data2", data2: ""});

            setSuccessMsg("Cadastro realizado com sucesso!");
            console.log(
              "sucesso!",
              rua,
              numero1,
              numero2,
              data1,
              data2
            );
          }
        }}
      >
        {/* rua */}
        <div className="form-group row">
          <div className="col-md-12 mb-4 mb-lg-0">
            <input
              className="form-control border"
              type="text"
              value={rua}
              onChange={e =>
                dispatch({type: "rua", rua: e.target.value})
              }
              placeholder="Rua"
              name="rua"
              required
            />
          </div>
        </div>
        {/* numeros */}
        <div className="form-group row">
          <div className="col-md-12 mb-4 mb-lg-0">
            <input
              className="form-control border"
              type="text"
              value={numero1}
              onChange={e =>
                dispatch({type: "numero1", numero1: e.target.value})
              }
              onBlur={() => setValidNumero1(validateNumber(numero1))}
              placeholder="Número inicial no Trecho"
              name="numero1"
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-12 mb-4 mb-lg-0">
            <input
              className="form-control border"
              type="text"
              value={numero2}
              onChange={e =>
                dispatch({type: "numero2", numero2: e.target.value})
              }
              onBlur={() => {
                setValidNumero2(validateNumber(numero2));
              }}
              placeholder="Número Final no Trecho"
              name="numero2"
              required
            />
          </div>
        </div>
        {/* datas */}
        <div className="form-group row">
          <div className="col-md-12 mb-4 mb-lg-0">
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
              placeholder="Data inicial da obra (dd/mm/aa)"
              name="data1"
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-12 mb-4 mb-lg-0">
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
              placeholder="Data inicial da obra (dd/mm/aa)"
              name="data2"
              required
            />
          </div>
        </div>
        {/* submit */}
        <div className="form-group row">
          <div className="col-md-12 ml-auto">
            <input
              className="btn btn-secondary text-white py-3 px-5"
              type="submit"
              value="Submit"
              // disabled={!isValid}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CadForm;

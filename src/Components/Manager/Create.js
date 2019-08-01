import React, {useReducer, useState, useEffect} from "react";
import {
  validateAdress,
  validateNumber,
  validateDate
} from "../Validators";

const reducer = (state, action) => {
  switch (action.type) {
    case "description":
      return {...state, description: action.description};
    case "data1":
      return {...state, data1: action.data1};
    case "data2":
      return {...state, data2: action.data2};
    default:
      return state;
  }
};

const Create = props => {
  const {onSubmit} = props;
  const [{description, data1, data2}, dispatch] = useReducer(
    reducer,
    {
      description: "",
      data1: "",
      data2: ""
    }
  );

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

    // console.log("mensagens de erro:", msgError);
  }, [validData1, validData2]);

  const isIntervalFree = (data1, data2) => {
    return true; // in construction
  };

  return (
    <div className="modal-body pt-6">
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
            isIntervalFree(data1, data2)
          ) {
            onSubmit({description, data1, data2});

            dispatch({type: "description", description: ""});
            dispatch({type: "data1", data1: ""});
            dispatch({type: "data2", data2: ""});

            setSuccessMsg("Cadastro realizado com sucesso!");
            // console.log("sucesso!", description, data1, data2);
          }
        }}
      >
        {/* description */}
        <div className="form-group row">
          <div className="col-md-12 mb-4 mb-lg-0">
            <textarea
              rows="5"
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
              disabled={!(validData1 && validData2)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;

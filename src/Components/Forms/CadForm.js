import React, {useReducer, memo} from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "rua":
      return {...state, rua: action.rua};
    case "numero1":
      return {...state, numero1: action.numero1};
    case "numero2":
      return {...state, numero2: action.numero2};
    default:
      return state;
  }
};

const CadForm = props => {
  const [{rua, numero1, numero2}, dispatch] = useReducer(reducer, {
    rua: "",
    numero1: "",
    numero2: ""
  });

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          props.onSubmit({rua, numero1, numero2});
        }}
      >
        <input
          type="text"
          value={rua}
          onChange={e => dispatch({type: "rua", rua: e.target.value})}
          placeholder="Rua"
          name="rua"
        />
        <input
          type="text"
          value={numero1}
          onChange={e =>
            dispatch({type: "numero1", numero1: e.target.value})
          }
          placeholder="Número inicial no Trecho"
          name="numero1"
        />
        <input
          type="text"
          value={numero2}
          onChange={e =>
            dispatch({type: "numero2", numero2: e.target.value})
          }
          placeholder="Número Final no Trecho"
          name="numero2"
        />
        <input
          className="btn btn-submit"
          type="submit"
          value="Submit"
        />
      </form>
    </>
  );
};

export default memo(CadForm);

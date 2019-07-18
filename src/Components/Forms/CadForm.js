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
    <div className="modal-body pt-6">
      <div className="modal-header">
        <h5 className="modal-title text-black" id="exampleModalLabel">
          {props.title}
        </h5>
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          props.onSubmit({rua, numero1, numero2});
        }}
      >
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
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-12 mb-4 mb-lg-0">
            <input
              className="form-control border"
              type="text"
              value={numero1}
              onChange={e =>
                dispatch({type: "numero1", numero1: e.target.value})
              }
              placeholder="Número inicial no Trecho"
              name="numero1"
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
              placeholder="Número Final no Trecho"
              name="numero2"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-12 ml-auto">
            <input
              className="btn btn-secondary text-white py-3 px-5"
              type="submit"
              value="Submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

/**
 * <form action="#" method="post">
              <div className="form-group row">
                <div className="col-md-12 mb-4 mb-lg-0">
                  <input type="text" className="form-control border" placeholder="First name">
                </div>
                <div className="col-md-12">
                  <input type="text" className="form-control border" placeholder="First name">
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-12">
                  <input type="text" className="form-control border" placeholder="Email address">
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-12">
                  <textarea name="" id="" className="form-control border" placeholder="Write your message." cols="30" rows="10"></textarea>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12 ml-auto">
                  <input type="submit" className="btn btn-block btn-secondary text-white py-3 px-5" value="Send Message">
                </div>
              </div>
            </form>
 */

export default memo(CadForm);

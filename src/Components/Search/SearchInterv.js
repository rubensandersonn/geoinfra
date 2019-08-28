import React, {useState, useEffect} from "react";

// import { Container } from './styles';

export default function Search(props) {
  const [state, setState] = useState({
    data: [],
    filteredData: []
  });

  useEffect(() => {
    // atualizando as intervenções que chegaram
    let data = [];
    const {interventions} = props;

    Object.keys(interventions).map(endereco => {
      interventions[endereco].map((el, index) => {
        data.push({el: el, index: index});
      });
    });
    setState(state => ({
      ...state,
      data: data
    }));
  }, [props.interventions]);

  const handleInputChange = event => {
    const query = event.target.value;

    setState(prevState => {
      const filteredData = prevState.data.filter(element => {
        return query !== ""
          ? element.el.endereco
              .toLowerCase()
              .includes(query.toLowerCase())
          : false;
      });

      return {
        ...prevState,
        filteredData
      };
    });
  };

  return (
    <div className="" style={{display: "block"}}>
      <form>
        <input
          className="form-control border"
          placeholder="Buscar Endereço de Intervenções"
          value={state.query}
          onChange={handleInputChange}
        />
      </form>
      <div>
        {state.filteredData.map((i, index) => (
          <div
            style={{cursor: "pointer", maxWidth: "220px"}}
            className="border rounded p-2 ml-2"
            onClick={() => {
              props.onClick(i.el, i.index);
              const address = i.el.endereco;
              setState(state => ({
                ...state,
                filteredData: []
              }));
            }}
            key={index}
          >
            {i.el.endereco}
          </div>
        ))}
      </div>
    </div>
  );
}

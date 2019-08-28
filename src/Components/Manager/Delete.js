import React, {useState} from "react";
import SearchInterv from "../Search/SearchInterv";

// import { Container } from './styles';

export default function Delete(props) {
  const {onSubmit, interventions} = props;

  const [chosen, setChosen] = useState(null);
  const [indexChosen, setIndexChosen] = useState(-1);

  const prettifyEl = el => (
    <div style={{maxWidth: "280px"}} className="border-left pl-2 m-2">
      <div className="p-2 border rounded">
        <span style={{fontWeight: "bold"}}>Endereço: </span>
        {el.endereco}
      </div>
      <div className="ml-2">
        <span style={{fontWeight: "bold"}}>Responsável: </span>
        {el.responsable}
      </div>
      <div className="ml-2">
        <span style={{fontWeight: "bold"}}>Descrição: </span>
        {el.description}
      </div>
      <div className="ml-2">
        <span style={{fontWeight: "bold"}}>data início: </span>
        {el.data1}
      </div>
      <div className="ml-2">
        <span style={{fontWeight: "bold"}}>data final: </span>
        {el.data2}
      </div>
    </div>
  );

  return (
    <div className="p-2">
      <SearchInterv
        interventions={interventions}
        onClick={(el, index) => {
          console.log(el, index);
          setChosen(el);
          setIndexChosen(index);
        }}
      />
      <div>
        {chosen ? (
          <div>
            <div>{prettifyEl(chosen)}</div>
            <div
              className="btn btn-danger p-2 m-2 ml-auto"
              onClick={e => {
                e.preventDefault();
                onSubmit(chosen, indexChosen);
                setChosen(null);
              }}
            >
              Excluir Intervenção
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

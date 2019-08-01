import React, {useEffect} from "react";

// import { Container } from './styles';

export default function Delete(props) {
  const {onSubmit, chosen} = props;

  // const [interventions, setInterventions] = React.useState([
  //   {
  //     responsable: "cagece",
  //     data_ini: "12/07/2019",
  //     data_fim: "13/07/2019",
  //     description: "its a intervention!"
  //   },
  //   {
  //     responsable: "cegas",
  //     data_ini: "12/07/2019",
  //     data_fim: "13/07/2019",
  //     description: "its a another intervention!"
  //   },
  //   {
  //     responsable: "cagece",
  //     data_ini: "12/07/2019",
  //     data_fim: "13/07/2019",
  //     description: "its a intervention!"
  //   }
  // ]);

  const prettifyEl = el => (
    <div className="border-left pl-2 m-2">
      <div>
        <span style={{fontWeight: "bold"}}>Responsável: </span>
        {el.responsable}
      </div>
      <div>
        <span style={{fontWeight: "bold"}}>Descrição: </span>
        {el.description}
      </div>
      <div>
        <span style={{fontWeight: "bold"}}>data início: </span>
        {el.data1}
      </div>
      <div>
        <span style={{fontWeight: "bold"}}>data fim: </span>
        {el.data2}
      </div>
    </div>
  );

  return (
    <>
      <div id="chosen" style={{display: "none"}}>
        <div className="container  p-2 m-2">
          {chosen ? prettifyEl(chosen) : ""}
        </div>
        <div
          className="btn btn-danger p-2 m-2 ml-auto"
          onClick={e => {
            e.preventDefault();
            onSubmit();
            document.getElementById("chosen").style.display = "none";
          }}
        >
          Excluir Intervenção
        </div>
      </div>
    </>
  );
}

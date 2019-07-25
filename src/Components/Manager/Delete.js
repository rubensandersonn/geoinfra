import React from "react";

// import { Container } from './styles';

export default function Delete(props) {
  const {onSubmit, interventions} = props;
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

  const [chosen, setChosen] = React.useState(<div />);
  const [indexChosen, setIndexChosen] = React.useState(<div />);

  const prettifyEl = el => (
    <div className="border-left pl-2 m-2">
      <div>
        <span style={{fontWeight: "bold"}}>Responsável: </span>
        {el.responsable}
      </div>
      <div>
        <span style={{fontWeight: "bold"}}>data início: </span>
        {el.data_ini}
      </div>
      <div>
        <span style={{fontWeight: "bold"}}>data fim: </span>
        {el.data_fim}
      </div>
    </div>
  );

  const linkClicked = (el, index) => {
    console.log("link clicked");
    document.getElementById("chosen").style.display = "block";
    setChosen(prettifyEl(el));
    setIndexChosen(index);
  };

  const mapInterventions = interventions.map((el, index) => {
    return (
      <a
        key={index}
        onClick={e => {
          e.preventDefault();
          linkClicked(el, index);
        }}
        href={index}
      >
        {prettifyEl(el)}
      </a>
    );
  });

  return (
    <>
      <div className="newdropdown">
        {/* <button className="newdropbtn">Dropdown</button> */}
        <div className="newdropbtn border rounded">Intervenções</div>
        <div className="newdropdown-content">{mapInterventions}</div>
      </div>
      <div id="chosen" style={{display: "none"}}>
        <div className="container  p-2 m-2">{chosen}</div>
        <div
          className="btn btn-danger p-2 m-2 ml-auto"
          onClick={() => {
            onSubmit(indexChosen);
            document.getElementById("chosen").style.display = "none";
          }}
        >
          Excluir Intervenção
        </div>
      </div>
    </>
  );
}

import React from "react";

// import { Container } from './styles';

export default function Delete(props) {
  //const {interventions} = props;
  const [interventions, setInterventions] = React.useState([
    {
      responsable: "cagece",
      data_ini: "12/07/2019",
      data_fim: "13/07/2019",
      description: "its a intervention!"
    },
    {
      responsable: "cegas",
      data_ini: "12/07/2019",
      data_fim: "13/07/2019",
      description: "its a another intervention!"
    },
    {
      responsable: "cagece",
      data_ini: "12/07/2019",
      data_fim: "13/07/2019",
      description: "its a intervention!"
    }
  ]);

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
      <div class="newdropdown">
        {/* <button class="newdropbtn">Dropdown</button> */}
        <div className="newdropbtn border rounded">Intervenções</div>
        <div class="newdropdown-content">{mapInterventions}</div>
      </div>
      <div id="chosen" style={{display: "none"}}>
        <div className="container  p-2 m-2">{chosen}</div>
        <button
          onClick={() => {
            let doidim = [];
            interventions.forEach((el, index) => {
              if (index !== indexChosen) {
                doidim.push(el);
              }
            });
            setInterventions(doidim);
            document.getElementById("chosen").style.display = "none";
          }}
          className="p-2 m-2 ml-auto"
        >
          Exluir Intervenção
        </button>
      </div>
    </>
  );
}

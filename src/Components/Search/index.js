import React from "react";
import ReactSearchBox from "react-search-box";

// import { Container } from './styles';

export default class Search extends React.Component {
  state = {
    chosen: null,
    interventions: null
  };

  componentDidMount() {
    const {interventions} = this.props;
    this.setState({interventions});
  }

  prettifyObj(obj) {
    return (
      <div className="row col-lg-12 p-2 mt-2 mb-2 border rounded">
        <div className="col-lg-5">
          <div>
            <span style={{fontWeight: "bold"}}>Responsável</span>:{" "}
            {obj.responsable}
          </div>
          <div>
            <span style={{fontWeight: "bold"}}>Descrição</span>:{" "}
            {obj.description}
          </div>
        </div>
        <div className="col-lg-7">
          <div>
            <span style={{fontWeight: "bold"}}>Data Início</span>:{" "}
            {obj.data1}
          </div>
          <div>
            <span style={{fontWeight: "bold"}}>Data Fim</span>:{" "}
            {obj.data2}
          </div>
          <div>
            <span style={{fontWeight: "bold"}}>Número Ini</span>:{" "}
            {obj.data1}
          </div>
          <div>
            <span style={{fontWeight: "bold"}}>Número Fim</span>:{" "}
            {obj.data2}
          </div>
        </div>
      </div>
    );
  }

  openObj(obj) {
    if (!obj.constructor === {}.constructor) {
      console.log("erro ao abrir o obj");
      return "";
    }

    Object.keys(obj).map(key => {
      if (obj[key].constructor === {}.constructor) {
        console.log("\t eh um objeto");
        this.openObj(obj[key]);
      } else if (obj[key].constructor === [].constructor) {
        console.log("\t eh um array");
        this.openArrayObj(obj[key]);
      } else {
        // achamos o dito cujo
        console.log("\t eh um monte de texto");
        let dt = this.state.data;
        dt.push({key: obj.endereco, value: JSON.stringify(obj)});
        this.setState({
          data: dt
        });
        console.log("data: ", this.state.data);
      }
      return null;
    });
  }

  openArrayObj(arr) {
    arr.map((el, index) => {
      if (el.constructor === {}.constructor) {
        this.openObj(el);
      } else {
        console.log("erro na pretty array", index);
      }
    });
  }

  render() {
    // const {data} = this.state;
    let data = null;
    const {interventions, onSubmit} = this.props;
    const {chosen} = this.state;
    // const {interventions} = data;

    /**
     * Sets Up the data to be shown in search
     */
    const map = Object.keys(interventions).map(key => {
      interventions[key].map((el, index) => {
        data = data ? data : [];
        data.push({
          key: el.endereco + "{" + index + "}",
          value: el.endereco + ", " + el.numero1 + "-" + el.numero2
        });
        return null;
      });
      return null;
    });

    /**
     * Callback when a element is chosen by the search bar
     * @param {*} el
     */
    const showEl = el => {
      let index = el.key.match(/{(\d*)}/g)[0].match(/\d+/g)[0];
      let endereco = el.key.split("{")[0];

      const chosenOne = interventions[endereco][index];
      this.setState({chosen: chosenOne});

      onSubmit(chosenOne, index);
    };

    return (
      <div>
        {data ? (
          <ReactSearchBox
            placeholder="Busca por endereço"
            value="Endereço"
            data={data}
            callback={record => console.log(record)}
            onSelect={el => showEl(el)}
            autoFocus
            inputBoxFontSize={"16px"}
          />
        ) : (
          "Carregando..."
        )}
        {map}
        {chosen && this.prettifyObj(chosen)}
      </div>
    );
  }
}

import React from "react";
import ReactSearchBox from "react-search-box";

// import { Container } from './styles';

export default class Search extends React.Component {
  state = {
    data: [
      {
        key: "john",
        value: "John Doe"
      },
      {
        key: "jane",
        value: "Jane Doe"
      },
      {
        key: "mary",
        value: "Mary Phillips"
      },
      {
        key: "robert",
        value: "Robert"
      },
      {
        key: "karius",
        value: "Karius"
      }
    ],
    interventions: null
  };

  componentDidMount() {
    const {interventions} = this.props;
    this.setState({interventions});
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("(search) novos recebidos", nextProps);
  //   const {interventions} = nextProps;

  //   if (this.state.interventions !== interventions) {
  //     this.setState({interventions});
  //   }
  // }
  // data = [
  //   {
  //     key: "john",
  //     value: "John Doe"
  //   },
  //   {
  //     key: "jane",
  //     value: "Jane Doe"
  //   },
  //   {
  //     key: "mary",
  //     value: "Mary Phillips"
  //   },
  //   {
  //     key: "robert",
  //     value: "Robert"
  //   },
  //   {
  //     key: "karius",
  //     value: "Karius"
  //   }
  // ];

  prettifyObj(obj) {
    Object.keys(obj).map(key => {
      return <div key={key}>{obj[key]}</div>;
    });
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

  prettify(el) {
    if (!el) {
    }
  }

  trataInterventions(interventions) {
    let data = [];

    Object.keys(interventions).map(key => {});

    this.setState({data});
  }

  trataEndereco = endereco => {
    return endereco.replace(" ", "_");
  };

  render() {
    // const {data} = this.state;
    let data = null;
    const {interventions} = this.props;
    // const {interventions} = data;

    const map = Object.keys(interventions).map(key => {
      interventions[key].map((el, index) => {
        data = data ? data : [];
        data.push({
          key: el.endereco + index,
          value: el.endereco + ", " + el.numero1 + "-" + el.numero2
        });
      });
    });

    return (
      <div>
        {data && (
          <ReactSearchBox
            placeholder="Busca por endereço"
            value="Endereço"
            data={data}
            callback={record => console.log(record)}
          />
        )}
        {map}
        {/* {JSON.stringify(data)}
        {JSON.stringify(this.state.data)} */}
      </div>
    );
  }
}

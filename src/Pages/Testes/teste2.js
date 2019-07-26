import React, {
  useReducer,
  useState,
  useEffect,
  useContext
} from "react";
// import Create from "../../Components/Manager/Create";
// import Delete from "../../Components/Manager/Delete";
// import Update from "../../Components/Manager/Update";
import AguaContext from "../../Context/AguaContext";
import Create from "../../Components/Manager/Create";
// import EsgotoContext from "../../Context/EsgotoContext";
// import GasContext from "../../Context/GasContext";

// import { Container } from './styles';

const reducer = (count, action) => {
  switch (action.type) {
    case "increment": {
      return count.map((el, index) => {
        if (index === action.index) {
          console.log("inc");
          return {...el, properties: [{desc: "increment"}]};
        } else {
          return el;
        }
      });
    }
    case "decrement": {
      return count.map((el, index) => {
        if (index === action.index) {
          console.log("dec");
          return {...el, properties: [{desc: "decrement"}]};
        } else {
          return el;
        }
      });
    }
  }
};

const Teste2 = props => {
  const {type, index} = props;
  const [objeto, setObject] = useState();
  let [count, dispatch] = useReducer(reducer, [{properties: [{}]}]);

  const {agua, dispatchAgua} = useContext(AguaContext);
  // const {esgoto, dispatchEsgoto} = useContext(EsgotoContext);
  // const {gas, dispatchGas} = useContext(GasContext);

  const submitCreate = obj => {
    console.log("submited obj:", obj);
    dispatchAgua({
      type: "create-intervention",
      index: index,
      value: obj
    });
  };

  let [mapaTOP, setMapa] = useState(() => {
    console.log("começando");
  });

  useEffect(() => {
    console.log("agua mudou");
    if (agua[index]) {
      if (!agua[index].properties.interventions) {
        agua[index].properties.interventions = [objeto];
      } else {
        agua[index].properties.interventions.push(objeto);
      }
      setMapa(
        agua[index].properties.interventions.map((interv, k) => {
          return <div key={k}>{JSON.stringify(interv)}</div>;
        })
      );
    } else {
      console.log("oloco bixo!!! deu errado meu");
    }
  }, [agua]);

  return (
    <>
      <>
        <button
          onClick={e => {
            e.preventDefault();
            dispatch({type: "increment", index: 0});
          }}
        >
          inc
        </button>
        <button
          onClick={e => {
            e.preventDefault();
            dispatchAgua({
              type: "create-intervention",
              index: index,
              value: {cuzim: "gostoso"}
            });
          }}
        >
          dec
        </button>
      </>
      <div>
        {agua[index] && JSON.stringify(agua[index].properties)}
      </div>
      <div>
        <Create
          onSubmit={obj => {
            setObject(obj);
            dispatchAgua({
              type: "create-intervention",
              index: index,
              value: {cuzim: "gostoso"}
            });
          }}
        />
      </div>
    </>
  );
};

export default Teste2;

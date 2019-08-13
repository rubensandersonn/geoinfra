import React, {useState} from "react";
import NoButton from "./NoButton";

// import { Container } from './styles';

export default function Links(props) {
  const {state} = props;

  const [visibleLinks, setOpen] = useState(false);

  return (
    <div className="ml-auto">
      <a
        onClick={e => {
          e.preventDefault();
          setOpen(!visibleLinks);
        }}
        style={{color: "orange"}}
        href="arquivos"
      >
        Download Shapefiles
      </a>
      <div>
        {visibleLinks && (
          <div>
            <ul>
              <li>
                <a target="_blank" href={state.aguaURL}>
                  Rede de Distribuição de Água
                </a>
              </li>
              <li>
                <a target="_blank" href={state.gasURL}>
                  Rede de Distribuição de Gás Natural
                </a>
              </li>
              <li>
                <a target="_blank" href={state.esgotoURL}>
                  Rede Coletora de Esgoto
                </a>
              </li>
              <li>
                <a target="_blank">Rede de Sistema Viário (vazio)</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

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
                  Rede Água
                </a>
              </li>
              <li>
                <a target="_blank" href={state.gasURL}>
                  Rede Gás
                </a>
              </li>
              <li>
                <a target="_blank" href={state.esgotoURL}>
                  Rede Esgoto
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

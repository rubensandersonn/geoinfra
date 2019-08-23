import React, {useState} from "react";

// import { Container } from './styles';

export default function Links() {
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
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={
                    process.env.REACT_APP_URL_SERVER_DOWNLOAD_AGUA
                  }
                >
                  Rede de Distribuição de Água
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={process.env.REACT_APP_URL_SERVER_DOWNLOAD_GAS}
                >
                  Rede de Distribuição de Gás Natural
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={
                    process.env.REACT_APP_URL_SERVER_DOWNLOAD_ESGOTO
                  }
                >
                  Rede Coletora de Esgoto
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={
                    process.env.REACT_APP_URL_SERVER_DOWNLOAD_VIARIO
                  }
                >
                  Rede de Sistema Viário
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

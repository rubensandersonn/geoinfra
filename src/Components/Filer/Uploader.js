import React, {useState, useContext, useEffect} from "react";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import {FirebaseContext} from "../Firebase";
import IconState from "./IconState";

const Uploader = props => {
  const [state, setState] = useState({
    image: "",
    imageURL: "",
    progress: 0,
    URL,
    texto_rede: "",
    serverStatus: "NOT"
  });

  const {type} = props;

  useEffect(() => {
    switch (type) {
      case "agua":
        setState(state => ({
          ...state,
          URL: process.env.REACT_APP_URL_SERVER_UPLOAD_AGUA,
          texto_rede: "Rede de Distribuição de Água"
        }));
        break;
      case "gas":
        setState(state => ({
          ...state,
          URL: process.env.REACT_APP_URL_SERVER_UPLOAD_GAS,
          texto_rede: "Rede de Distribuição de Gás Natural"
        }));

        break;
      case "viario":
        setState(state => ({
          ...state,
          URL: process.env.REACT_APP_URL_SERVER_UPLOAD_VIARIO,
          texto_rede: "Rede do Sistema Viário"
        }));
        break;
      case "esgoto":
        setState(state => ({
          ...state,
          URL: process.env.REACT_APP_URL_SERVER_UPLOAD_ESGOTO,
          texto_rede: "Rede Coletora de Esgoto"
        }));
        break;
      default:
        console.log("erro ao chavear o tipo");
        break;
    }
  }, [type]);

  const firebase = useContext(FirebaseContext);

  const sendRequest = file => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      const formData = new FormData();
      formData.append("file", file);
      //url agua
      req.open("POST", state.URL);
      req.send(formData);
      req.onerror = function(erro) {
        setState(state => ({...state, serverStatus: "ERRO"}));
        alert(`Servidor indisponível`); // responseText is the server
        console.log(erro);
      };
      req.onload = function() {
        /**
         * HTTP STATUS CODE ERROR
         * 400 BAD REQUEST
         * 401 UNAUTHORIZED
         * 402 PAYMENT REQUIRED
         * 403 FORBIDDEN
         * 404 NOT FOUND
         * 405 METHOD NOT ALLOWED
         * 406 NOT ACCEPTABLE
         * 408 REQUEST TIMEOUT
         * 409 CONFLICT
         * 418 IM A TEAPOT!!!
         * 500 internal ERROR
         * 503 service unavailable
         */
        setState(state => ({...state, serverStatus: "ERRO"}));
        switch (req.status) {
          case 200:
            setState(state => ({
              ...state,
              serverStatus: "OK"
            }));
            alert(`Arquivo salvo no danco de dados`); // responseText is the server
            // colocar OK na interface. Qualquer outro caso: colocar X
            break;
          case 400:
            alert(`SERVER ERROR: Arquivo inválido`); // responseText is the server
            break;
          case 401:
            alert(`SERVER ERROR: Requisição Não autorizada`); // responseText is the server
            break;
          case 402:
            alert(`SERVER ERROR: Pague suas contas!!!`); // responseText is the server
            break;
          case 403:
            alert(`SERVER ERROR: operação proibida no servidor`); // responseText is the server
            break;
          case 404:
            alert(`SERVER ERROR: servidor não encontrado`); // responseText is the server
            break;
          case 405:
            alert(`SERVER ERROR: método não permitido`); // responseText is the server
            break;
          case 406:
            alert(`SERVER ERROR: arquivo não suportado`); // responseText is the server
            break;
          case 408:
            alert(`SERVER ERROR: timeout atingido`); // responseText is the server
            break;
          case 500:
            alert(`SERVER ERROR: Erro interno no servidor`); // responseText is the server
            break;
          case 503:
            alert(`SERVER ERROR: banco de dados inacessível`); // responseText is the server
            break;
          case 418:
            alert(`SERVER ERROR: Arquivo inválido (teapot)`); // responseText is the server
            break;
          default:
            alert(`Erro desconhecido no servidor`); // responseText is the server
            break;
        }
      };
    });
  };

  const handleUploadStart = e => {
    // console.log("quando começa: ", e);
    setState(state => ({
      ...state,
      progress: 0,
      serverStatus: "WAITING"
    }));
    sendRequest(e); // enviando arquivo
  };

  const handleUploadSuccess = filename => {
    setState(state => ({
      ...state,
      image: filename,
      progress: 100
    }));
  };

  const handleProgress = progress => {
    setState(state => ({...state, progress: progress}));
  };

  const handleUploadError = err => {
    console.log("Erro ao fazer upload:", err);
  };

  return (
    <div className="container border rounded p-2 m-4 col-lg-8">
      <p>Fazer Upload da {state.texto_rede}</p>
      <IconState
        state={{status: state.serverStatus, image: state.image}}
      />
      <CustomUploadButton
        // accept={"application/json"}
        storageRef={firebase.getRef()}
        onUploadStart={handleUploadStart}
        onUploadError={handleUploadError}
        onUploadSuccess={handleUploadSuccess}
        onProgress={handleProgress}
        style={{
          backgroundColor: "steelblue",
          color: "white",
          padding: 10,
          borderRadius: 4
        }}
      >
        Procurar Arquivo
      </CustomUploadButton>
    </div>
  );
};

export default Uploader;

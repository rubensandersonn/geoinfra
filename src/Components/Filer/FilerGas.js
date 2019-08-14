import React, {useState, useEffect, useContext} from "react";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import {FirebaseContext} from "../Firebase";

const FilerGas = () => {
  const [state, setState] = useState({
    image: "",
    imageURL: "",
    progress: 0
  });

  const firebase = useContext(FirebaseContext);

  const sendRequest = file => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      const formData = new FormData();
      formData.append("file", file, file.name);

      req.open("POST", process.env.REACT_APP_URL_SERVER_UPLOAD_GAS);
      req.send(formData);
    });
  };

  const handleUploadStart = e => {
    setState(state => ({...state, progress: 0}));
    sendRequest(e);
  };

  const handleUploadSuccess = filename => {
    setState({
      image: filename,
      progress: 100
    });
  };

  const handleName = filename => {
    console.log(filename);
    return "rdg_meireles.json";
  };

  const handleProgress = progress => {
    setState(state => ({...state, progress: progress}));
  };

  const handleUploadError = err => {
    console.log("Erro ao fazer upload:", err);
  };

  return (
    <div className="container border rounded p-2 m-4 col-lg-8">
      {state.progress !== 0 ? <div>{state.progress}%</div> : <div />}
      {state.image ? (
        <div>
          <label>Arquivo: </label>
          {state.image}
        </div>
      ) : (
        <p>
          AVISO: o nome do arquivo será salvo como "rdg_meireles" e
          precisa ter extensão ".geojson" ou ".json"
        </p>
      )}

      <CustomUploadButton
        accept={"application/json"}
        filename={handleName}
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
        Fazer Upload da Rede de Distribuição de Gás Natural
      </CustomUploadButton>
    </div>
  );
};

export default FilerGas;

import React, {useState, useContext} from "react";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import {FirebaseContext} from "../Firebase";

const FilerEsgoto = () => {
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

      req.open(
        "POST",
        process.env.REACT_APP_URL_SERVER_UPLOAD_ESGOTO
      );
      req.send(formData);
    });
  };

  const handleUploadStart = e => {
    // console.log("quando começa: ", e);
    setState(state => ({...state, progress: 0}));
    sendRequest(e); // enviando arquivo
  };

  const handleUploadSuccess = filename => {
    setState({
      image: filename,
      progress: 100
    });
  };

  const handleName = filename => {
    // console.log(filename);
    return "rde_meireles.json";
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
          AVISO: o nome do arquivo será salvo como "rde_meireles" e
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
        Fazer Upload da Rede Coletora de Esgoto
      </CustomUploadButton>
    </div>
  );
};

export default FilerEsgoto;

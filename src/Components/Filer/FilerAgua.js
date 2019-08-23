import React, {useState, useContext} from "react";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import {FirebaseContext} from "../Firebase";

const FilerAgua = () => {
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
      formData.append("file", file, "rda_meireles.json");
      req.open("POST", process.env.REACT_APP_URL_SERVER_UPLOAD_AGUA);
      req.send(formData);
    });
  };

  const handleUploadStart = e => {
    // console.log("quando começa: ", e);
    setState(state => ({...state, progress: 0}));
    if (isJson(e.name)) {
      sendRequest(e); // enviando arquivo
    }
  };

  const handleUploadSuccess = filename => {
    setState({
      image: filename,
      progress: 100
    });
  };

  const isJson = filename => {
    if (!filename) {
      return false;
    }
    const splitted = filename.split(".");

    if (splitted && splitted[splitted.length - 1] === "json") {
      return true;
    }
    if (splitted && splitted[splitted.length - 1] === "geojson") {
      return true;
    }
    return false;
  };

  const handleProgress = progress => {
    setState(state => ({...state, progress: progress}));
  };

  const handleUploadError = err => {
    console.log("Erro ao fazer upload:", err);
  };

  return (
    <div className="container border rounded p-2 m-4 col-lg-8">
      {state.progress !== 0 ? (
        <div>Carregando: {state.progress}%</div>
      ) : (
        <div />
      )}
      {state.image ? (
        !isJson(state.image) ? (
          <div style={{color: "red", margin: 15}}>
            Erro! Arquivo {state.image} não possui a extensão ".json"
            ou ".GeoJSON"
          </div>
        ) : (
          <div>
            <div style={{color: "#262626"}}>
              <label>Arquivo: </label>
              <span style={{fontWeight: "bold"}}> {state.image}</span>
            </div>
          </div>
        )
      ) : (
        <>
          <p style={{color: "#262626"}}>
            AVISO: o nome do arquivo será salvo como "rda_meireles" e
            precisa ter extensão ".GeoJSON" ou ".json"
          </p>
          <p style={{fontStyle: "italic"}}>
            Para converter seu arquivo gpkg ou Shapefile para GeoJSON,
            clique{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://ngageoint.github.io/geopackage-js/"
            >
              AQUI.
            </a>
          </p>
        </>
      )}

      <CustomUploadButton
        accept={"application/json"}
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
        Fazer Upload da Rede de Distribuição de Água
      </CustomUploadButton>
    </div>
  );
};

export default FilerAgua;

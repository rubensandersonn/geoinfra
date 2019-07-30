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

  const handleUploadStart = () => {
    setState(state => ({...state, progress: 0}));
  };

  const handleUploadSuccess = filename => {
    setState({
      image: filename,
      progress: 100
    });

    firebase
      .getRef()
      .child("rda_meireles.json")
      .getDownloadURL()
      .then(url => {
        setState(state => ({...state, imageURL: url}));
      });
  };

  const handleProgress = progress => {
    setState(state => ({...state, progress: progress}));
  };

  const handleUploadError = err => {
    console.log(err);
  };

  console.log(state);

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
          AVISO: o nome do arquivo será salvo como "rda_meireles" e
          precisa ter extensão ".geojson" ou ".json"
        </p>
      )}
      <div>
        {state.imageURL && (
          <a target="_blank" href={state.imageURL}>
            Link para download aqui
          </a>
        )}
      </div>
      <CustomUploadButton
        accept="json/*"
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
        Fazer Upload do arquivo
      </CustomUploadButton>
    </div>
  );
};

export default FilerAgua;

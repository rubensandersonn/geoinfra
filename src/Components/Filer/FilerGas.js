import React, {
  useState,
  createRef,
  useEffect,
  useContext
} from "react";
import FileUploader from "react-firebase-file-uploader";
import {FirebaseContext} from "../Firebase";

const FilerGas = () => {
  const [state, setState] = useState({
    image: "",
    imageURL: "",
    progress: 0,
    files: []
  });

  const firebase = useContext(FirebaseContext);

  let fileUploader = createRef();

  useEffect(() => {
    firebase
      .getRef()
      .child("rdg_meireles.json")
      .getDownloadURL()
      .then(url => {
        setState(state => ({...state, imageURL: url}));
      });
  }, []);

  const handleUploadStart = e => {
    console.log("quando começa: ", e);
    setState(state => ({...state, progress: 0}));
  };

  const handleUploadSuccess = filename => {
    setState({
      image: filename,
      progress: 100
    });

    firebase
      .getRef()
      .child("rdg_meireles.json")
      .getDownloadURL()
      .then(url => {
        setState(state => ({...state, imageURL: url}));
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

  //=== === === ===

  const customOnChangeHandler = event => {
    const {
      target: {files}
    } = event;
    let filesToStore = [];

    if (
      files.FileList &&
      files.FileList.constructor === [].constructor
    ) {
      files.FileList.forEach(file => filesToStore.push(file));
    } else {
      filesToStore = files;
    }

    console.log("files to store gas: ", filesToStore);

    setState(state => ({...state, files: filesToStore}));
  };

  const startUploadManually = () => {
    const {files} = this.state;
    files.forEach(file => {
      this.fileUploader.startUpload(file);
    });
  };

  console.log(state);

  return (
    <div className="container border rounded p-2 m-4 col-lg-8">
      {/* {state.progress !== 0 ? <div>{state.progress}%</div> : <div />}
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
      <div>
        {state.imageURL && (
          <a target="_blank" href={state.imageURL}>
            Link para download do arquivo atual aqui
          </a>
        )}
      </div> */}
      <FileUploader
        accept={"application/json"}
        filename={handleName}
        storageRef={firebase.getRef()}
        onChange={customOnChangeHandler}
        ref={fileUploader}

        // onUploadStart={handleUploadStart}
        // onUploadError={handleUploadError}
        // onUploadSuccess={handleUploadSuccess}
        // onProgress={handleProgress}
        // style={{
        //   backgroundColor: "steelblue",
        //   color: "white",
        //   padding: 10,
        //   borderRadius: 4
        // }}
      />
    </div>
  );
};

export default FilerGas;

import React, {useState, useEffect, useContext} from "react";

import mapContext from "../../Context/mapContext";
import Mapp from ".";
import MapOperations from "../../Components/MapOperations";
import Manager from "../../Components/Manager";
import AguaContext from "../../Context/aguaContext";
import EsgotoContext from "../../Context/esgotoContext";
import {AuthUserContext} from "../../Components/Session";

const polyTypes = {
  agua: "agua",
  gas: "gas",
  esgoto: "esgoto"
};

const MapHandler = () => {
  const [open, setOpen] = useState(false);
  const [polyType, setPolyType] = useState();
  const [key, setKey] = useState({});

  const setModalClose = () => {
    setOpen(false);
  };

  const setModalOpen = () => {
    setOpen(true);
  };

  const setType = type => {
    setPolyType(polyTypes[type]);
  };

  return (
    <>
      <AguaContext.Provider>
        <EsgotoContext.Provider>
          <Modal open={open} onClose={setModalClose} little={false}>
            <div className="container mt-4 p-4">
              <div className="mt-4 pt-4">
                <Manager key={key} type={polyType} />
              </div>
            </div>
          </Modal>

          <MapOperations />

          <mapContext.Provider>
            <Mapp
              setModalOpen={setModalOpen}
              setType={setType}
              setKey={setKey}
            />
          </mapContext.Provider>
        </EsgotoContext.Provider>
      </AguaContext.Provider>
    </>
  );
};

export default MapHandler;

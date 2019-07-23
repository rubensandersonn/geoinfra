import {createContext} from "react";

import jsonEsgoto from "../utils/jsons/rda_meireles.json";

let esgoto = jsonEsgoto.features;
esgoto = esgoto.esgoto;

const EsgotoContext = createContext({esgoto});

export default EsgotoContext;

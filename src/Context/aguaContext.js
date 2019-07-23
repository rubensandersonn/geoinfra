import {createContext} from "react";

import jsonAgua from "../utils/jsons/rda_meireles.json";

let agua = jsonAgua.features;
agua = agua.agua;

const AguaContext = createContext({agua});

export default AguaContext;

import {createContext} from "react";

import jsonGas from "../utils/jsons/rda_meireles.json";

let gas = jsonGas.features;
gas = gas.gas;

const GasContext = createContext({gas});

export default GasContext;

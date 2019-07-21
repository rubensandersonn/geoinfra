import {createContext, useState} from "react";

import jsonEsgoto from "../../utils/jsons/rde_meireles.json";

const [esgoto, setEsgoto] = useState(jsonEsgoto.features);

const EsgotoContext = createContext({esgoto, setEsgoto});

export default EsgotoContext;

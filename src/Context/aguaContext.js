import {createContext} from "react";

import jsonAgua from "../../utils/jsons/rda_meireles.json";

const [agua, setAgua] = useState(jsonAgua.features);

const AguaContext = createContext({agua: agua, setAgua});

export default AguaContext;

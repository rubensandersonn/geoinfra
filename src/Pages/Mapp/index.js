import React, {useContext} from "react";
import {
  Map,
  GoogleApiWrapper,
  Polyline,
  InfoWindow
} from "google-maps-react";
import mapContext from "../../Context/mapContext";
import {AuthUserContext} from "../../Components/Session";
import AguaContext from "../../Context/aguaContext";
import EsgotoContext from "../../Context/esgotoContext";
//import markerContext from "../../Context/markerContext";

const Mapp = props => {
  // ========= CONTEXTS ==========

  const {initialPlace, mapStyles} = useContext(mapContext);
  const {agua, setAgua} = useContext(AguaContext);
  const {esgoto, setEsgoto} = useContext(EsgotoContext);

  const {authUser} = useContext(AuthUserContext);
  // about marker...
  const [visibleInfo, setVisibleInfo] = useState(false);
  const [valueMarker, setValueMarker] = useState(false);
  const [positionMarker, setPositionMarker] = useState({
    lat: null,
    lng: null
  });

  const {google, setKey, setType, setModalOpen} = props;

  // ======== AUX FUNCTIONs ===========

  const pretifyWindow = value => {
    const mapp = Object.keys(value).map(key => {
      if (!key.match(/id|x|y/gm)) {
        return (
          <div key className="row container">
            <span style={{fontWeight: "bold"}}>
              {key.replace(/_/gm, " ")}
            </span>
            {": "}
            {key === "em_operacao"
              ? value[key]
                ? "SIM"
                : "NÃO"
              : value[key]}
          </div>
        );
      }
      return null;
    });

    return mapp;
  };

  /**
   * Tela de informação regular para usuários não logados
   * @param {*} key
   * @param {*} type
   * @param {*} coord
   */
  const showRegularInfo = (key, type, coord) => {
    console.log("poly clicked", key, type, coord[0]);

    let val = {};

    switch (type) {
      case "agua":
        val = agua[key].properties; // essa propriedade nao existe originalmente.
        break;
      case "esgoto":
        val = esgoto[key].properties; // essa propriedade nao existe originalmente.
        break;
      default:
        break;
    }

    // quem desativa a visibilidade é o map click
    setVisibleInfo(true);

    const mediaCoord = {
      lat: (coord[0].lat + coord[1].lat) / 2,
      lng: (coord[0].lng + coord[1].lng) / 2
    };

    //setando as coordenadas da infoWindow.
    // Espero receber dois valores lat lng
    setPositionMarker(mediaCoord);

    // setando o conteudo da infoWindow
    setValueMarker(pretifyWindow(val));
  };

  // ======== CALLBACKS ==========

  /**
   * Quando o mapa for clickado, a infoWindow deve sumir
   */
  const onMapClicked = () => {
    setVisibleInfo(false);
  };

  /**
   * Quando a linha é clicada, deve mostrar uma tela simples de info
   * para usuários não logados. Para logados, mostrar tela de gerenciamento
   * @param {*} key
   * @param {*} type
   * @param {*} coord
   */
  const onPolyClicked = (key, type, coord) => {
    let el;

    switch (type) {
      case "agua":
        el = agua[key];
        break;
      case "esgoto":
        el = esgoto[key];
        break;
      default:
        el = el;
        break;
    }

    if (
      authUser &&
      (authUser.email === "rubens@gmail.com" ||
        ((type === "agua" || type === "esgoto") &&
          authUser.email === "cagece@gmail.com") ||
        (type === "gas" && authUser.email === "cegas@gmail.com"))
    ) {
      setModalOpen(true);
      setKey(key);
      setType(type);
    } else {
      showRegularInfo(key, type, coord);
    }
  };

  // quando o mouse passa sobre a poly, atualizar
  // {visibleInfo, valueMarker, positionMarker}
  const onPolyHover = coord => {
    console.log("poly hovered", coord[0]);

    // quem desativa a visibilidade é o map click
    setVisibleInfo(true);

    const mediaCoord = {
      lat: (coord[0].lat + coord[1].lat) / 2,
      lng: (coord[0].lng + coord[1].lng) / 2
    };

    //setando as coordenadas da infoWindow. Espero receber dois valores lat lng
    setPositionMarker(mediaCoord);

    setValueMarker("Clique para ver mais");
  };

  /**
   * Função que mapeia a rede de agua
   */
  let mapAgua = agua.map((el, index) => {
    el.properties.em_operacao = false;

    var path = [];
    const coord = el.geometry.coordinates;

    // endereço inicio
    path.push({
      lat: coord[0][1],
      lng: coord[0][0]
    });
    // endereço fim
    path.push({
      lat: coord[1][1],
      lng: coord[1][0]
    });

    return (
      <Polyline
        key={index}
        path={path}
        options={{
          strokeColor: "pink",
          strokeOpacity: 0.8,
          strokeWeight: 3
        }}
        onClick={e => onPolyClicked(index, "agua", path)}
        onMouseover={() => onPolyHover(path)}
      />
    );
  });

  /**
   * Função que mapeia a rede de esgoto
   */
  let mapEsgoto = esgoto.map((el, index) => {
    el.properties.em_operacao = true;

    var path = [];
    const coord = el.geometry.coordinates;

    // endereço inicio
    path.push({
      lat: coord[0][1],
      lng: coord[0][0]
    });
    // endereço fim
    path.push({
      lat: coord[1][1],
      lng: coord[1][0]
    });

    return (
      <Polyline
        key={index}
        path={path}
        options={{
          strokeColor: "green",
          strokeOpacity: 0.8,
          strokeWeight: 3
        }}
        onClick={() => onPolyClicked(index, "esgoto", path)}
        onMouseover={() => onPolyHover(path)}
      />
    );
  });

  return (
    <Map
      google={google}
      zoom={16}
      styles={mapStyles}
      initialCenter={initialPlace}
      onClick={onMapClicked}
    >
      <InfoWindow
        visible={visibleInfo}
        key={1}
        position={
          new google.maps.LatLng(
            positionMarker.lat,
            positionMarker.lng
          ) || {
            lat: 0,
            lng: 0
          }
        }
      >
        <div className="container">
          <div className="row">
            <div style={{color: "black"}}>{valueMarker}</div>
          </div>
        </div>
      </InfoWindow>
      {mapAgua}
      {mapEsgoto}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDI8rhCfDYeRozbap8tk0tCgVqq3i9Y40A"
})(Mapp);

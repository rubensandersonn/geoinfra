import React from "react";
import {Marker, InfoWindow} from "react-google-maps";

// onclick nao eh necessario, pois quem vai ser clicado
//é a polyline. o Marker sempre estará visível, mas sem icone.
//a infowindow segue ele e é mostrada quando o mouse interage com a poly

const icon = {
  url: "",
  scaledSize: {width: 2, height: 2}
};

const Markerr = props => {
  const {
    positionMarker,
    visibleInfo,
    valueMarker,
    styles,
    google
  } = props;
  console.log("on marker:", props);
  return (
    <Marker
      visible={visibleInfo}
      key={1}
      position={
        new google.maps.LatLng(position.lat, position.lng) || {
          lat: 0,
          lng: 0
        }
      }
    >
      <InfoWindow>
        <div style={styles}>{valueMarker}</div>
      </InfoWindow>
    </Marker>
  );
};

export default Markerr;

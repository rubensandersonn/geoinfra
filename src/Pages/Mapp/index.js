import React, {useContext} from "react";
import {Map, GoogleApiWrapper, InfoWindow} from "google-maps-react";
import mapContext from "../../Context/mapContext";
import markerContext from "../../Context/markerContext";

const Mapp = props => {
  const {
    initialPlace,
    mapAgua,
    mapEsgoto,
    mapStyles,
    onMapClicked
  } = useContext(mapContext);

  const {visibleInfo, valueMarker, positionMarker} = useContext(
    markerContext
  );

  const {google} = props;

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
        <div style={{color: "black"}}>{valueMarker}</div>
      </InfoWindow>
      {mapAgua}
      {mapEsgoto}
      {/* <Markerr
        styles={{color: "black"}}
        visibleInfo={visibleInfo}
        valueMarker={valueMarker}
        positionMarker={positionMarker}
      /> */}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDI8rhCfDYeRozbap8tk0tCgVqq3i9Y40A"
})(Mapp);

import React, { useContext } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import mapContext from "../../Context/mapContext";

const Mapp = props => {
  const { initialPlace, mapAgua, mapEsgoto, mapStyles } = useContext(
    mapContext
  );
  const { google } = props;

  return (
    <Map
      google={google}
      zoom={16}
      styles={mapStyles}
      initialCenter={initialPlace}
    >
      {mapAgua}
      {mapEsgoto}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDI8rhCfDYeRozbap8tk0tCgVqq3i9Y40A"
})(Mapp);

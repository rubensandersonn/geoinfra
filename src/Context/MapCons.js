const initialPlace = {lat: -3.727898, lng: -38.500058};
// 555722.3250,9587790.5696
const decifreme1 = -149071.225929;
const decifreme2 = -249033.146121;
// const initialPlace = {
//   lat: 555722.325 / decifreme1,
//   lng: 9587790.5696 / decifreme2
// };

const polyTypes = {
  agua: "agua",
  gas: "gas",
  esgoto: "esgoto"
};

const mapStyles = [
  {elementType: "geometry", stylers: [{color: "#242f3e"}]},
  {elementType: "labels.text.stroke", stylers: [{color: "#242f3e"}]},
  {elementType: "labels.text.fill", stylers: [{color: "#746855"}]},
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{color: "#d59563"}]
  },
  {
    featureType: "poi",
    stylers: [{visibility: "off"}]
  },

  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{color: "#38414e"}]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{color: "#212a37"}]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{color: "#9ca5b3"}]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{color: "#746855"}]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{color: "#1f2835"}]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{color: "#f3d19c"}]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{color: "#2f3948"}]
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{color: "#d59563"}]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{color: "#17263c"}]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{color: "#515c6d"}]
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{color: "#17263c"}]
  }
];

const MapCons = {initialPlace, mapStyles, polyTypes};

export default MapCons;

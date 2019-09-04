import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import {GoogleApiWrapper} from "google-maps-react";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {address: ""};
  }

  handleChange = address => {
    this.setState({address});
  };

  handleSelect = address => {
    const {onSelect} = this.props;
    this.setState({address});

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        onSelect(latLng, address);
      })
      .catch(error => console.error("Error", error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({
          getInputProps,
          suggestions,
          getSuggestionItemProps,
          loading
        }) => (
          <div>
            <input
              id="search"
              {...getInputProps({
                placeholder: "Busca por endereço...",
                className: "form-control border pr-2 pl-2"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "border text-blue p-2"
                  : "border text-black p-2";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {backgroundColor: "#fafafa", cursor: "pointer"}
                  : {backgroundColor: "#ffffff", cursor: "pointer"};
                return (
                  <div
                    className="border"
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_URI_GOOGLE_MAPS
})(LocationSearchInput);

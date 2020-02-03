import React, { Component } from "react";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker
} from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";

import { markerDragged, onPlaceSelected } from "../actions";
import { connect } from "react-redux";

Geocode.setApiKey("AIzaSyDj-wMiz8Hqcpoo4igNjHBG2rnxvOp_LNo");
Geocode.enableDebug();


class CurratedMap extends Component {
  /**
   * Get the city and set the city input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getCity = addressArray => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };
  /**
   * Get the area and set the area input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getArea = addressArray => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };
  /**
   * Get the address and set the address input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getState = addressArray => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };
  /**
   * And function for city,state and address input
   * @param event
   */
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     this.state.markerPosition.lat !== this.props.center.lat ||
  //     this.state.address !== nextState.address
  //   ) {
  //     return true;
  //   } else if (this.props.center.lat === nextProps.center.lat) {
  //     return false;
  //   }
  // }

  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */

  onMarkerDragEnd = event => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      response => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
          markerPosition: {
            lat: newLat,
            lng: newLng
          },
          mapPosition: {
            lat: newLat,
            lng: newLng
          }
        });
      },
      error => {
        console.error(error);
      }
    );
  };

  /**
   * When the user types an address in the search box
   * @param place
   */

  onPlaceSelected = place => {
    console.log("plc", place);
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    // Set these values in the state.
    this.setState({
      address: address ? address : "",
      area: area ? area : "",
      city: city ? city : "",
      state: state ? state : "",
      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      }
    });
  };

  render() {
    const WrappedMap = withScriptjs(
      withGoogleMap(() => (
        <GoogleMap defaultZoom={10} defaultCenter={{ lat: this.props.location.mapPosition.lat, lng: this.props.location.mapPosition.lng }}>
          <Autocomplete
            style={{
              width: "60%",
              height: "40px",
              paddingLeft: "16px",
              marginTop: "8px",
              left: "25%",
              top: "2.5%",
              position: "absolute"
            }}
            onPlaceSelected={this.props.onPlaceSelected}
            types={["(regions)"]}
          />
          <Marker
            name={"Dolores park"}
            draggable={true}
            onDragEnd={this.props.markerDragged}
            position={{ lat: this.props.location.markerPosition.lat, lng: this.props.location.markerPosition.lng }}
          />
          <Marker />
        </GoogleMap>
      ))
    );

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDj-wMiz8Hqcpoo4igNjHBG2rnxvOp_LNo`}
          loadingElement={
            <div
              style={{ height: "100%", width: "100%", display: "inline-block" }}
            />
          }
          containerElement={
            <div
              style={{ height: "100%", width: "100%", display: "inline-block" }}
            />
          }
          mapElement={
            <div
              style={{ height: "100%", width: "100%", display: "inline-block" }}
            />
          }
        />
      </div>
    );
  }
}

const mapStateToProps = ({isloading, location, errors}) => ({
  isloading,
  location,
  errors
})

const mapDispatchtoProps = dispatch =>({
  markerDragged: (event) => dispatch(markerDragged(event)),
  onPlaceSelected: (place) => dispatch(onPlaceSelected(place))
})

export default connect(mapStateToProps, mapDispatchtoProps)(CurratedMap);
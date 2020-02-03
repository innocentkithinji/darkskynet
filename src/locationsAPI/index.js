import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDj-wMiz8Hqcpoo4igNjHBG2rnxvOp_LNo");
Geocode.enableDebug();

/**
 * When the marker is dragged you get the lat and long using the functions available from event object.
 * Use geocode to get the address, city, area and state from the lat and lng positions.
 * And then set those values in the state.
 *
 * @param event
 */
const onMarkerDragEnd = async event => {
  let newLat = event.latLng.lat();
  let newLng = event.latLng.lng();

  const response = await Geocode.fromLatLng(newLat, newLng);
  console.log(response);
  const address = response.results[0].formatted_address;
  let location = {
    address: address ? address : "",
    markerPosition: {
      lat: newLat,
      lng: newLng
    },
    mapPosition: {
      lat: newLat,
      lng: newLng
    }
  };

  return location;
};

const onPlaceSelected = place => {
  console.log("plc", place);
  const address = place.formatted_address;
  const latValue = place.geometry.location.lat();
  const lngValue = place.geometry.location.lng();
  // Set these values in the state.
  return {
    address: address ? address : "",
    markerPosition: {
      lat: latValue,
      lng: lngValue
    },
    mapPosition: {
      lat: latValue,
      lng: lngValue
    }
  };
};

export { onMarkerDragEnd, onPlaceSelected };

import { LOCATION } from "../constants";

const defaultLocation = {
  address: "Unnamed Road",
  markerPosition: {
    lat: -1,
    lng: 36.8
  },
  mapPosition: {
    lat: -1,
    lng: 36.8
  }
};

const locationReducer = (state = defaultLocation, action) => {
  if (action.type === LOCATION.LOAD_SUCCESS) {
    return action.location;
  }

  return state;
};

export default locationReducer;

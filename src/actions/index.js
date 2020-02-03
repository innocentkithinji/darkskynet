import { LOCATION } from "../constants";

const loadlocation = () => ({
  type: LOCATION.LOAD
});

const setLocation = location => ({
  type: LOCATION.LOAD_SUCCESS,
  location
});

const setError = error => ({
  type: LOCATION.LOAD_FAIL,
  error
});

const markerDragged = event => ({
  type: LOCATION.ON_MARKER_DRAGGED,
  event
})

const onPlaceSelected = place => ({
  type: LOCATION.ON_PLACE_SELECTED,
  place
})

export { loadlocation, setLocation, setError, markerDragged, onPlaceSelected };

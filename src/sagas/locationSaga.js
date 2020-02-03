import { takeEvery, call, put } from "redux-saga/effects";
import { LOCATION } from "../constants";
import { onMarkerDragEnd, onPlaceSelected } from "../locationsAPI";
import { setLocation } from "../actions";

function* handleMarkerDragged({ event }) {
  const location = yield call(onMarkerDragEnd, event);
  yield put(setLocation(location));
}

function* handlePlaceSelected({ place }) {
  const location = yield call(onPlaceSelected, place);
  yield put(setLocation(location));
}

function* locationSaga() {
  yield takeEvery(LOCATION.ON_MARKER_DRAGGED, handleMarkerDragged);
  yield takeEvery(LOCATION.ON_PLACE_SELECTED, handlePlaceSelected);
}

export default locationSaga;

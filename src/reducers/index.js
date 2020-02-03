import { combineReducers } from "redux";

import  errorReducer from "./errorReducer";
import  loadingReducer  from "./loadingReducer";
import  locationReducer  from "./locationReducer";


const rootReducer = combineReducers({
    isLoading: loadingReducer,
    location: locationReducer,
    errors: errorReducer
});


export default rootReducer;
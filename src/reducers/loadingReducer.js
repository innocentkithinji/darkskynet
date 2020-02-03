import { LOCATION } from "../constants";

const loadingReducer = (state = false, action) =>{
    switch(action.type){
        case LOCATION.LOAD:
            return true;
        case LOCATION.LOAD_SUCCESS:
            return false;
        case LOCATION.LOAD_FAIL:
            return false
        default:
            return state;
    }
}


export default loadingReducer;
import { LOCATION } from "../constants";

const errorReducer = (state = [], action) =>{
    switch(action.type){
        case LOCATION.LOAD_FAIL:
            return action.error;
        case LOCATION.LOAD_SUCCESS:
        case LOCATION.LOAD:
            return null;
        default:
            return state;
    }
}


export default errorReducer;
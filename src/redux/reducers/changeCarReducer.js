import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function changeCarReducer(state=initialState.currentCar,action){
    switch (action.type) {
        case actionTypes.CHANGE_CAR:
                console.log(action.payload);
                return action.payload
        default:
                return state;
    }
}
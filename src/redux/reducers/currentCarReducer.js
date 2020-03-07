import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function currentCarReducer(
  state = initialState.currentCar,
  action
) {
  switch (action.type) {
    case actionTypes.CHANGE_CAR:
      return action.payload;
    case actionTypes.GET_CURRENT_CAR:
      return state;
    default:
      return state;
  }
}
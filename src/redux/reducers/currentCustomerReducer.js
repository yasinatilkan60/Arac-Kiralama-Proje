import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function currentCustomerReducer(
  state = initialState.currentCustomer,
  action
) {
  switch (action.type) {
    case actionTypes.CHANGE_CUSTOMER:
      return action.payload;
    case actionTypes.GET_CURRENT_CUSTOMER:
      return state;
    default:
      return state;
  }
}

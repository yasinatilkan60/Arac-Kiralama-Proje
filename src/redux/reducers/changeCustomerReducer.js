import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function changeCustomerReducer(
    state = initialState.savedCustomer,
    action
  ) {
    switch (action.type) {
      case actionTypes.CHANGE_CUSTOMER:
        return action.payload;
      default:
        return state;
    }
  }
  
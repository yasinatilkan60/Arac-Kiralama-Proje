import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function changeCustomerReducer(
    state = initialState.savedCustomer,
    action
  ) {
    switch (action.type) {
      case actionTypes.UPDATE_CUSTOMER_SUCCESS:
        return action.payload;
      case actionTypes.CREATE_CUSTOMER_SUCCESS:
        return action.payload;
      default:
        return state;
    }
  }
  
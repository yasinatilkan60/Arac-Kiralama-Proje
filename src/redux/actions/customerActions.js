import * as actionTypes from "./actionTypes";

export function getCustomersSuccess(customers) {
    return { type: actionTypes.GET_CUSTOMERS_SUCCESS, payload: customers};
}
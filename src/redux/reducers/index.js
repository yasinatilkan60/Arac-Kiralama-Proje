import {combineReducers} from "redux";

import carListReducer from "./carListReducer";
import customerListReducer from "./customerListReducer";
import changeCarReducer from "./changeCarReducer";
import changeCustomerReducer from "./changeCustomerReducer";
import currentCustomerReducer from "./currentCustomerReducer";

const rootReducer = combineReducers ({
    carListReducer,
    customerListReducer,
    changeCarReducer,
    changeCustomerReducer,
    currentCustomerReducer
})

export default rootReducer;
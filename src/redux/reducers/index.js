import {combineReducers} from "redux";

import carListReducer from "./carListReducer";
import customerListReducer from "./customerListReducer";
import changeCarReducer from "./changeCarReducer";
import changeCustomerReducer from "./changeCustomerReducer";
import currentCustomerReducer from "./currentCustomerReducer";
import currentCarReducer from "./currentCarReducer";

const rootReducer = combineReducers ({
    carListReducer,
    customerListReducer,
    changeCarReducer,
    changeCustomerReducer,
    currentCustomerReducer,
    currentCarReducer
})

export default rootReducer;
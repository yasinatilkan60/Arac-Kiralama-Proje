import {combineReducers} from "redux";

import carListReducer from "./carListReducer";
import customerListReducer from "./customerListReducer";
import changeCarReducer from "./changeCarReducer";
import changeCustomerReducer from "./changeCustomerReducer";

const rootReducer = combineReducers ({
    carListReducer,
    customerListReducer,
    changeCarReducer,
    changeCustomerReducer
})

export default rootReducer;
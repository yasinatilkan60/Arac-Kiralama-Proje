import {combineReducers} from "redux";

import carListReducer from "./carListReducer";
import customerListReducer from "./customerListReducer";
import changeCarReducer from "./changeCarReducer";

const rootReducer = combineReducers ({
    carListReducer,
    customerListReducer,
    changeCarReducer
})

export default rootReducer;
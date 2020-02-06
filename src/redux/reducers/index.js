import {combineReducers} from "redux";

import carListReducer from "./carListReducer";
import customerListReducer from "./customerListReducer";

const rootReducer = combineReducers ({
    carListReducer,
    customerListReducer
})

export default rootReducer;
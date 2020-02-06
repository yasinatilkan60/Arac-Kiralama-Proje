import * as actionTypes from "./actionTypes";

export function getCarsSuccess(cars) {
    return { type: actionTypes.GET_CARS_SUCCESS, payload: cars};
}

export function getCars(carId){
    return function(dispatch){
        let api = "http://localhost:3000/cars";
        if(carId)
            api = api + "/" + carId;
        return fetch(api)
        .then(res => res.json()).then(result => dispatch(getCarsSuccess(result)));
    };
}
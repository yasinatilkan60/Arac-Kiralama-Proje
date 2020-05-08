import * as actionTypes from "./actionTypes";

export function changeCar(car) {
  return { type: actionTypes.CHANGE_CAR, payload: car };
}

export function getCarsSuccess(cars) {
  return { type: actionTypes.GET_CARS_SUCCESS, payload: cars };
}
export function getCurrentCar(car) {
  return { type: actionTypes.GET_CURRENT_CAR, payload: car };
}

export function getCars(carId) {
  return function (dispatch) {
    let api = "http://localhost:3000/cars";
    if (carId) api = api + "/" + carId;
    return fetch(api)
      .then((res) => res.json())
      .then((result) => dispatch(getCarsSuccess(result)));
  };
}
export function saveCarApi(car) {
  
    let api = "http://localhost:3000/cars/" + (car.id || "");
    return fetch(api, {
      method: car.id ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(car),
    })
      .then(handleResponse)
      .catch(handleError);
}
export function saveCar(car) {
  return function (dispatch) {
    return saveCarApi(car).then(dispatch(getCars())).catch(error => {throw error;})
  };
}
export async function handleResponse(response) {
  console.log(response.ok);
  if (response.ok) {
    return response.json();
  }
  const error = await response.text();
  throw new Error(error);
}

export function handleError(error) {
  console.log("Bir hata meydana geldi." + error);
  throw error;
}

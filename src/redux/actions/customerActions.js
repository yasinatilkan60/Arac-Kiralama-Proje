import * as actionTypes from "./actionTypes";

export function getCustomersSuccess(customers) {
    return { type: actionTypes.GET_CUSTOMERS_SUCCESS, payload: customers};
}

export function updateCustomerSuccess(customer){
    return { type:actionTypes.UPDATE_CUSTOMER_SUCCESS, payload: customer}
}

export function createCustomerSuccess(customer){
    return { type:actionTypes.CREATE_CUSTOMER_SUCCESS, payload: customer}
}

export function getCurrentCustomer(customer){
    return { type:actionTypes.GET_CURRENT_CUSTOMER, payload: customer}
}

export function changeCurrentCustomer(customer){
    return { type:actionTypes.CHANGE_CUSTOMER, payload: customer}
}

export function getCustomers(customerId){
    return function(dispatch){
        let api = "http://localhost:3000/customers";
        if(customerId)
            api = api + "/" + customerId;
        return fetch(api)
        .then(res => res.json()).then(result => dispatch(getCustomersSuccess(result)));
    };
}

// Aşağıdaki fonksiyon json-server rest api kurallarına göre yazılmıştır.
export function saveCustomerApi(customer){
    let api = "http://localhost:3000/customers/" + (customer.id || "");
    return fetch(api , {
        method: customer.id ? "PUT" : "POST",
        headers : {"content-type":"application/json"},
        body : JSON.stringify(customer)
    }).then(handleResponse).catch(handleError);
}

export function saveCustomer(customer) {
    return function(dispatch){
        return saveCustomerApi(customer).then(savedCustomer => {
            customer.id?dispatch(updateCustomerSuccess(savedCustomer)):dispatch(createCustomerSuccess(savedCustomer))
        }).catch(error => {
            throw error;
        })
    }
}

export async function handleResponse(response) {
    console.log(response.ok);
    if(response.ok){
        return response.json()
    }
    const error = await response.text();
    throw new Error(error); 
}

export function handleError(error) {
    console.log("Bir hata meydana geldi." + error);
    throw error;
}

import Product from "../../models/Product";
import Order from "../../models/Order";

export const ADD_ORDER = 'ADD_ORDER'
export const IMPORT_ORDER = 'IMPORT_ORDER'


export const importOrders = () => {
    try {
        return async (dispatch, getState) => {
            const idUser = getState().AuthReducer.idUser;

            const response = await fetch(``);

            if (!response.ok){
                throw new Error('Something wrong with you');
            }
            const resData = await response.json();

            const importedOrders = [];
            for (const key in resData){
                importedOrders.push(
                    new Order(
                        key,
                        resData[key].CartItems,
                        resData[key].TotalAmount,
                        new Date(resData[key].date)
                    )
                )
            }
            console.log(importedOrders)
            dispatch({type: IMPORT_ORDER, orders : importedOrders});
        }
    } catch (err) {
        throw err;
    }
}


export const addOrder = (CartItems, TotalAmount) => {
    return async (dispatch, getState) =>{
        const currentDate = new Date();
        const token = getState().AuthReducer.token;
        const idUser = getState().AuthReducer.idUser;

        const response = await fetch(``, {

                method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CartItems,
                TotalAmount,
                date : currentDate.toString()
            })
        });
        if (!response.ok){
            throw new Error('Something wrong with you');
        }
        const resData = await response.json();
        dispatch({
            type : ADD_ORDER,
            totalCart : {CartItems, TotalAmount, date : currentDate, id : resData.name}
        });
    }
}



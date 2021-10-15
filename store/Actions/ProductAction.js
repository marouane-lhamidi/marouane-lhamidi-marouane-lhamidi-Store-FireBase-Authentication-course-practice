import Product from "../../models/Product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'
export const IMPORT_DATA = 'IMPORT_DATA'

export const deleteProduct = (id) => {
    return async (dispatch, getState) =>{
        const token = getState().AuthReducer.token;

        const response = await fetch(``, {
            method: 'Delete',
        });
        dispatch ({
            type : DELETE_PRODUCT,
            id
        })
    }

}
export const importData = () => {
    try {
        return async (dispatch, getState) =>{
            const idUser = getState().AuthReducer.idUser;

            const response = await fetch('');

            if (!response.ok){
                throw new Error('Something wrong with you');
            }
            const resData = await response.json();

            const importedData = [];
            for (const key in resData){
                importedData.push(new Product(
                    key,
                    resData[key].ownerID,
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price
                ))
            }
            console.log(importedData.filter(prod => prod.ownerID === idUser))
            console.log(getState())
         }
    } catch (err) {
        throw err;
    }
}

export const addProduct = (title, description, price, imageUrl) => {
    return async (dispatch, getState) =>{
        // any async code you want!
        const token = getState().AuthReducer.token;
        const idUser = getState().AuthReducer.idUser;

        const response = await fetch(``, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerID : idUser
            })
        });


        const resData = await response.json();
        dispatch({
            type: ADD_PRODUCT,
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price,
                ownerID : idUser

            }
        });
    };

}
export const editProduct = (id,title, description, imageUrl) => {
    return async (dispatch, getState) =>{
        console.log(getState())
        const token = getState().AuthReducer.token;

        const response = await fetch(``, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
            })
        });
        if (!response.ok){
            throw new Error('Something wrong with you');
        }
        dispatch( {
            type : EDIT_PRODUCT,
            id,
            updatedProduct : {
                title,
                description,
                imageUrl
            }
        })

    }
}

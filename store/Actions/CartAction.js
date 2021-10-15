export const ADD_TO_CART = 'ADD_TO_CART'
export const DELETE_FROM_CART = 'DELETE_FROM_CART'

export const addToCart = (Product) => {
    return {
        type : ADD_TO_CART,
        Product
    }
}

export const deleteFromCart = (id) => {
    return {
        type : DELETE_FROM_CART,
        id
    }
}

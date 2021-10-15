import {ADD_TO_CART,DELETE_FROM_CART} from "../Actions/CartAction";
import {ADD_ORDER} from "../Actions/OrdersAction";

import CartItem from "../../models/CartItem";
import {DELETE_PRODUCT} from "../Actions/ProductAction";

const initialisation = {
    items : {},
    totalAmount : 0
}

const CartReducer = (state = initialisation, action) => {
    switch (action.type) {
        case ADD_TO_CART :
            const product = action.Product;
            const price = product.price;
            const title = product.title;
            let ourProduct;
            if (state.items[product.id]){
                ourProduct = new CartItem(
                    state.items[product.id].Qty + 1,
                    title,
                    price,
                    state.items[product.id].sum + price
                )

            }else {
                ourProduct = new CartItem(1, title , price, price)
            }
            return {
                ...state,
                items: {...state.items, [product.id] : ourProduct},
                totalAmount: state.totalAmount + price
            }


        case DELETE_FROM_CART :
            const ourItem = state.items[action.id];
            let ourItems;
            if (ourItem.Qty > 1 ){
                const updatedItem = new CartItem(
                    ourItem.Qty - 1,
                    ourItem.title,
                    ourItem.price,
                    ourItem.sum - ourItem.price
                )
            ourItems = {...state.items,[action.id] : updatedItem }
            }else {
                ourItems = {...state.items};
                delete ourItems[action.id];
            }
            return {
                ...state,
                items: ourItems,
                totalAmount: state.totalAmount - ourItem.price
            }

        case ADD_ORDER :
            return initialisation;

        case DELETE_PRODUCT :
            if (!state.items[action.id])
                return state;
            const updatedTable = state.items;
            const total = state.items[action.id].sum
            delete updatedTable[action.id];

            return {
                ...state,
                items: updatedTable,
                 totalAmount: state.totalAmount - total
            }
        default :
            return state
    }

}

export default CartReducer;
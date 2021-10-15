import {ADD_ORDER,IMPORT_ORDER} from "../Actions/OrdersAction";
import Order from "../../models/Order";

const initialisation = {
    Orders : []
}

const OrderReducer = (state = initialisation, action) => {
    switch (action.type) {
        case IMPORT_ORDER :
            return {
                Orders: action.orders
            }

        case ADD_ORDER :
            const creatOrder = new Order(
                action.totalCart.id,
                action.totalCart.CartItems,
                action.totalCart.TotalAmount,
                action.totalCart.date
            )
            return {
                ...state,
                Orders: state.Orders.concat(creatOrder)
            }

        default :
            return state
    }

}

export default OrderReducer;
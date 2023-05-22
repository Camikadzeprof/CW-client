import {ALL_ORDERS, CURRENT_ORDER, ORDER_CLEAR} from "./actionTypes";

const initialState = {
    _id: '',
    amount: '',
    paid: '',
    address: '',
    status: '',
    courier: '',
    createBy: '',
    createdAt: '',
    updatedAt: '',
    orders: []
}
const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_ORDERS: {
            return {...state, ...action.payload};
        }
        case CURRENT_ORDER: {
            return {...state, ...action.payload};
        }
        case ORDER_CLEAR: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}
export default orderReducer;
import {ALL_CARTS, CART_CLEAR, CURRENT_CART} from './actionTypes';

const initialState = {
    _id: '',
    food: '',
    amount: '',
    quantity: '',
    user: '',
    carts: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_CARTS: {
            return {...state, ...action.payload};
        }
        case CURRENT_CART: {
            return {...state, ...action.payload};
        }
        case CART_CLEAR: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

export default cartReducer;
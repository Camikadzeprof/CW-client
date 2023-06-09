import {ALL_CART, CART_CLEAR} from './actionTypes';

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
        case ALL_CART: {
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
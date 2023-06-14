import {ALL_CARTITEMS, CARTITEMS_CLEAR, CURRENT_CARTITEM} from './actionTypes';

const initialState = {
    _id: '',
    food: '',
    quantity: '',
    amount: '',
    cart: '',
    cartItems: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_CARTITEMS: {
            return {...state, ...action.payload};
        }
        case CURRENT_CARTITEM: {
            return {...state, ...action.payload};
        }
        case CARTITEMS_CLEAR: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

export default cartReducer;
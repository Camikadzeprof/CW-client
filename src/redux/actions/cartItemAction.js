import {ALL_CARTITEMS, CARTITEMS_CLEAR, CURRENT_CARTITEM} from '../reducers/actionTypes';

export const getCartItems = (obj) => (dispatch) => {
    try {
        dispatch({type: ALL_CARTITEMS, payload: {cartItems: obj}});
    } catch (e) {
        dispatch({type: ALL_CARTITEMS, payload: {cartItems: null}});
    }
}
export const getCurrentCartItem = (_id, food, quantity, amount, cart) => (dispatch) => {
    try {
        dispatch({type: CURRENT_CARTITEM, payload: {_id, food, quantity, amount, cart}});
    } catch (e) {
        dispatch({type: CURRENT_CARTITEM, payload: {_id: null, food: null, quantity: null, amount: null, cart: null}});
    }
}

export const clearCartItems = () => (dispatch) => {
    dispatch({type: CARTITEMS_CLEAR, payload: null})
}
import {ALL_CARTS, CART_CLEAR, CURRENT_CART} from '../reducers/actionTypes';

export const getCarts = (obj) => (dispatch) => {
    try {
        dispatch({type: ALL_CARTS, payload: {carts: obj}});
    } catch (e) {
        dispatch({type: ALL_CARTS, payload: {carts: null}});
    }
}
export const getCurrentCart = (_id, food, amount, quantity, user) => (dispatch) => {
    try {
        dispatch({type: CURRENT_CART, payload: {_id, food, amount, quantity, user}});
    } catch (e) {
        dispatch({type: CURRENT_CART, payload: {_id: null, food: null, amount: null, quantity: null, user: null}});
    }
}

export const clearCarts = () => (dispatch) => {
    dispatch({type: CART_CLEAR, payload: null})
}
import {ALL_CART, CART_CLEAR} from '../reducers/actionTypes';

export const getCart = (_id, amount, user) => (dispatch) => {
    try {
        dispatch({type: ALL_CART, payload: {_id, amount, user}});
    } catch (e) {
        dispatch({type: ALL_CART, payload: {_id: null, amount: null, user: null}});
    }
}
export const clearCart = () => (dispatch) => {
    dispatch({type: CART_CLEAR, payload: null})
}
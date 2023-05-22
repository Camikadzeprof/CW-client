import {ALL_ORDERS, CURRENT_ORDER, ORDER_CLEAR} from "../reducers/actionTypes";

export const getOrders = (obj) => (dispatch) => {
    try {
        dispatch({type: ALL_ORDERS, payload: {orders: obj}});
    } catch (e) {
        dispatch({type: ALL_ORDERS, payload: null});
    }
}
export const clearOrders = () => (dispatch) => {
    dispatch({type: ORDER_CLEAR, payload: null});
}
export const getCurrentOrder = (_id, amount, paid, address, status, courier, createBy, createdAt, updatedAt) => (dispatch) => {
    try {
        dispatch({
            type: CURRENT_ORDER,
            payload: {_id: _id, amount: amount, paid: paid, address: address, status: status, courier: courier, createBy: createBy, createdAt: createdAt, updatedAt: updatedAt}
        });
    } catch (e) {
        dispatch({
            type: CURRENT_ORDER,
            payload: {_id: null, amount: null, paid: null, address: null, status: null, courier: null, createBy: null, createdAt: null, updatedAt: null}
        })
    }
}
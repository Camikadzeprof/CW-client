import {ALL_ORDERITEMS, ORDERITEM_CLEAR, CURRENT_ORDERITEM} from '../reducers/actionTypes';

export const getOrderItems = (obj) => (dispatch) => {
    try {
        dispatch({type: ALL_ORDERITEMS, payload: {orderItems: obj}});
    } catch (e) {
        dispatch({type: ALL_ORDERITEMS, payload: {orderItems: null}});
    }
}
export const getCurrentOrderItem = (_id, food, amount, order) => (dispatch) => {
    try {
        dispatch({type: CURRENT_ORDERITEM, payload: {_id, food, amount, order}});
    } catch (e) {
        dispatch({type: CURRENT_ORDERITEM, payload: {_id: null, food: null, amount: null, order: null}});
    }
}

export const clearOrderItems = () => (dispatch) => {
    dispatch({type: ORDERITEM_CLEAR, payload: null})
}
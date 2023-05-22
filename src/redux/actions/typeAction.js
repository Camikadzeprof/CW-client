import {ALL_TYPES, CURRENT_TYPE, TYPE_CLEAR} from "../reducers/actionTypes";

export const getTypes = (obj) => (dispatch) => {
    try {
        dispatch({type: ALL_TYPES, payload: {types: obj}});
    } catch (e) {
        dispatch({type: ALL_TYPES, payload: null});
    }
}
export const clearTypes = () => (dispatch) => {
    dispatch({type: TYPE_CLEAR, payload: null});
}
export const getCurrentType = (_id, name) => (dispatch) => {
    try {
        dispatch({
            type: CURRENT_TYPE,
            payload: {_id: _id, name: name}
        });
    } catch (e) {
        dispatch({
            type: CURRENT_TYPE,
            payload: {_id: null, name: null}
        })
    }
}
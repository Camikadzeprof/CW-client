import {NEW_MESSAGE} from "../reducers/actionTypes";

export const setMessage = (obj) => (dispatch) => {
    try {
        dispatch({type: NEW_MESSAGE, payload: obj});
    } catch (e) {
        dispatch({type: NEW_MESSAGE, payload: null});
    }
}
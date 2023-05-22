import {CHAT_DATA} from "../reducers/actionTypes";

export const setChatData = (obj) => (dispatch) => {
    try {
        dispatch({type: CHAT_DATA, payload: obj});
    } catch (e) {
        dispatch({type: CHAT_DATA, payload: null});
    }
}
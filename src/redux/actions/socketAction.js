import {JOIN_ROOM} from "../reducers/actionTypes";

export const setSocket = (users) => (dispatch) => {
    try {
        dispatch({type: JOIN_ROOM, payload: {...users}});
    } catch (e) {
        dispatch({type: JOIN_ROOM, payload: {userID: null, username: null}});
    }
}
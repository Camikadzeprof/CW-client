import {AUTHORIZATION, ALL_USERS, USER_CLEAR, GET_USER_DATA, USER_ORDERS} from "../reducers/actionTypes";

export const authUser = (id, username, role, token, success) => (dispatch) => {
    try {
        dispatch({type: AUTHORIZATION, payload: {id, username, role, token, success}});
    } catch (e) {
        dispatch({
            type: AUTHORIZATION, payload: {
                id: null,
                username: null,
                email: null,
                phone: null,
                role: null,
                token: null,
                success: false,
                users: null
            }
        });
    }
}
export const getAllUsers = (obj) => (dispatch) => {
    try {
        dispatch({type: ALL_USERS, payload: {users: obj}});
    } catch (e) {
        dispatch({type: ALL_USERS, payload: null});
    }
}

export const getUserById = (email, phone) => dispatch => {
    try {
        dispatch({type: GET_USER_DATA, payload: {email, phone}})
    } catch (e) {
        dispatch({type: GET_USER_DATA,
            payload: {
                email: null,
                phone: null
            }
        })
    }
}
export const getUserOrders = (obj) => (dispatch) => {
    try {
        dispatch({type: USER_ORDERS, payload: {posts: obj}});
    } catch (e) {
        dispatch({type: USER_ORDERS, payload: null});
    }
}

export const logoutUser = () => (dispatch) => {
    dispatch({type: USER_CLEAR, payload: null});
}
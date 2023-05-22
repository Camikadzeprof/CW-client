import {ALL_USERS, AUTHORIZATION, GET_USER_DATA, USER_CLEAR, USER_ORDERS} from "./actionTypes";

const initialState = {
    id: '',
    username: '',
    email: '',
    phone: '',
    role: '',
    token: '',
    success: false,
    users: [],
    orders: [],
    carts: []
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHORIZATION: {
            return {...state, ...action.payload};
        }
        case ALL_USERS: {
            return {...state, ...action.payload};
        }
        case USER_CLEAR: {
            return initialState;
        }
        case USER_ORDERS: {
            return {...state, ...action.payload};
        }
        case GET_USER_DATA: {
            return {...state, ...action.payload};
        }
        default: {
            return state;
        }
    }
}
export default userReducer;
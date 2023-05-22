import {JOIN_ROOM} from "./actionTypes";

const initialState = [{
    userID: null,
    username: null
}]
const socketReducer = (state = initialState, action) => {
    switch (action.type) {
        case JOIN_ROOM: {
            return {...state, ...action.payload};
        }
        default: {
            return state;
        }
    }
}
export default socketReducer;
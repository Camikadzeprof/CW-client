import {NEW_MESSAGE} from "./actionTypes";

const initialState = {
    username: null,
    message: null
}
const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_MESSAGE: {
            return {...state, ...action.payload};
        }
        default: {
            return state;
        }
    }
}
export default messageReducer;
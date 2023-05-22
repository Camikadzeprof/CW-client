import {CHAT_DATA} from "./actionTypes";

const initialState = {
    users: [],
    messages: []
}
const chatDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHAT_DATA: {
            return {...state, ...action.payload};
        }
        default: {
            return state;
        }
    }
}
export default chatDataReducer;
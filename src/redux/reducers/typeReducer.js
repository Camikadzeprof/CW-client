import {ALL_TYPES, CURRENT_TYPE, TYPE_CLEAR} from "./actionTypes";

const initialState = {
    _id: '',
    name: '',
    menus: []
}
const topicReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_TYPES: {
            return {...state, ...action.payload};
        }
        case CURRENT_TYPE: {
            return {...state, ...action.payload};
        }
        case TYPE_CLEAR: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}
export default topicReducer;

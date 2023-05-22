import {ALL_MENU, CURRENT_MENU, MENU_CLEAR} from "../reducers/actionTypes";


const initialState = {
    _id: '',
    name: '',
    type: '',
    img: '',
    description: '',
    price: '',
    menus: []
}
const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_MENU: {
            return {...state, ...action.payload};
        }
        case CURRENT_MENU: {
            return {...state, ...action.payload};
        }
        case MENU_CLEAR: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

export default menuReducer;
import {ALL_MENU, CURRENT_MENU, MENU_CLEAR} from "../reducers/actionTypes";


export const getMenu = (obj) => (dispatch) => {
    try {
        dispatch({type: ALL_MENU, payload: {menus: obj}});
    } catch (e) {
        dispatch({type: ALL_MENU, payload: {menus: null}});
    }
}

export const getCurrentMenu = (_id, name, type, img, description, price) => (dispatch) => {
    try {
        dispatch({
            type: CURRENT_MENU,
            payload: {
                _id: _id,
                name: name,
                type: type,
                img: img,
                description: description,
                price: price
            }
        });
    } catch (e) {
        dispatch({
            type: CURRENT_MENU,
            payload: {
                _id: null,
                name: null,
                type: null,
                img: null,
                description: null,
                price: null
            }
        })
    }
}

export const clearMenu = () => (dispatch) => {
    dispatch({type: MENU_CLEAR, payload: null})
}
import {combineReducers} from "redux";
import userReducer from "./userReducer";
import socketReducer from "./socketReducer";
import messageReducer from "./messageReducer";
import chatDataReducer from "./chatDataReducer";
import typeReducer from "./typeReducer";
import menuReducer from "./menuReducer";
import orderReducer from "./orderReducer";
import orderItemReducer from "./orderItemReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
    user: userReducer,
    socket: socketReducer,
    message: messageReducer,
    chatData: chatDataReducer,
    type: typeReducer,
    menu: menuReducer,
    order: orderReducer,
    orderItem: orderItemReducer,
    cart: cartReducer
})
export default rootReducer;
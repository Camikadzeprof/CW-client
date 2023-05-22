import {ALL_ORDERITEMS, ORDERITEM_CLEAR, CURRENT_ORDERITEM} from './actionTypes';

const initialState = {
    _id: '',
    food: '',
    amount: '',
    quantity: '',
    order: '',
    orderItems: []
}

const orderItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_ORDERITEMS: {
            return {...state, ...action.payload};
        }
        case CURRENT_ORDERITEM: {
            return {...state, ...action.payload};
        }
        case ORDERITEM_CLEAR: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

export default orderItemReducer;
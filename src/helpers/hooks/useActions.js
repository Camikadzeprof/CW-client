import * as UserActions from '../../redux/actions/userAction';
import * as SocketActions from '../../redux/actions/socketAction';
import * as MessageActions from '../../redux/actions/messageAction';
import * as ChatDataActions from '../../redux/actions/chatDataAction';
import * as TypeActions from '../../redux/actions/typeAction';
import * as MenuActions from '../../redux/actions/menuAction';
import * as OrderActions from '../../redux/actions/orderAction';
import * as OrderItemActions from '../../redux/actions/orderItemAction';
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as CartActions from '../../redux/actions/cartAction'

const actions = {
    ...UserActions,
    ...SocketActions,
    ...MessageActions,
    ...ChatDataActions,
    ...TypeActions,
    ...MenuActions,
    ...OrderActions,
    ...OrderItemActions,
    ...CartActions
}
const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
}
export default useActions;
import React, {useEffect, useState} from "react";
import useActions from "../helpers/hooks/useActions";
import {Button, Modal} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const AddOrderListModal = ({closeCallback, showAddOrderListModal}) => {
    const redux = useActions();
    const {id} = useSelector(state => state.user);
    const {_id} = useSelector(state => state.cart)
    const [amountValue, setAmountValue] = useState('');
    const [paidValue, setPaidValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
    const [courierValue, setCourierValue] = useState('');
    const token = localStorage.getItem('token');
    const history = useHistory();
    const redirect = (path) => {
        history.push(path);
    }
    let amount = 0;
    let crtitms;
    useEffect(() => {
        (async () => {
            if (token) {
                fetch(`/cartItems/cart/${_id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(data => data.json())
                    .then(async (cartItems) => {
                        redux.getCartItems(cartItems);
                        crtitms = cartItems;
                    })
            }
        })()
    }, [])

    const {cartItems} = useSelector(state => state.cartItem);

    const addOrderListSubmit = async (e) => {
        let order;
        e.preventDefault();
        for (let i = 0; i < cartItems.length; i++) {
            amount += cartItems[i].amount;
        }
        await fetch('/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                amount: amount,
                paid: false,
                address: addressValue,
                status: 'Ожидает оплаты',
                createBy: id
            })
        })
            .then(data => data.json())
            .then(data => {
                alert(data.message);
                order = data.orderId;
            })
            .catch(e => {
                alert(e.message)
            })
        for (let i = 0; i < cartItems.length; i++) {
            fetch('/orderItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    food: cartItems[i].food,
                    amount: cartItems[i].quantity,
                    order: order._id
                })
            })
        }
        fetch(`/cart/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(data => data.json())
            .then(data => {
                redux.clearCart();
                redux.clearCartItems();
            })
        let result = window.confirm('Желаете оплатить онлайн?');
        if (!result) {
            closeCallback();
            fetch(`/orders/user/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(data => data.json())
                .then(orders => {
                    redux.getOrders(orders);
                })
        }
        else {
            redirect(`/payment/${order.amount}/${order._id}`);
        }
    }
    return (
        <>
            <Modal
                show={showAddOrderListModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Заказать</Modal.Title>
                </Modal.Header>
                <form onSubmit={addOrderListSubmit}>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="address-input" className="form-label">Адрес</label>
                            <input type="text" className="form-control" id="address-input" required="true"
                                   placeholder="Адрес" value={addressValue}
                                   onChange={e => setAddressValue(e.target.value)}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <input className="btn btn-success" type="submit" value="Заказать"/>
                        <Button variant="secondary" onClick={closeCallback}>
                            Закрыть
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default AddOrderListModal;
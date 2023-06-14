import React, {useEffect, useState} from "react";
import useActions from "../helpers/hooks/useActions";
import {Button, Modal} from "react-bootstrap";
import {useSelector} from "react-redux";
import {redirect} from "react-router";
import {useHistory} from "react-router-dom";

const AddOrderModal = ({closeCallback, cartItemId, showAddOrderModal}) => {
    const redux = useActions();
    const {id} = useSelector(state => state.user);
    const [quantityValue, setQuantityValue] = useState('');
    const [paidValue, setPaidValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
    const [courierValue, setCourierValue] = useState('');
    const token = localStorage.getItem('token');
    const history = useHistory();
    const redirect = (path) => {
        history.push(path);
    }
    let crts;
    useEffect(() => {
        (async () => {
            if (token) {
                fetch(`/cartItem/${cartItemId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(data => data.json())
                    .then(({_id, food, quantity, amount}) => {
                        setQuantityValue(quantity);
                        redux.getCurrentCartItem(_id, food, quantity, amount);
                    })
            }
        })()
    }, [])

    let {_id, food, quantity, amount} = useSelector(state => state.cartItem);
    const addOrderSubmit = async (e) => {
        e.preventDefault();
        let order;
        if (quantityValue > 0) {
            await fetch('/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    amount: quantityValue * food.price,
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
            fetch('/orderItem/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    food: food,
                    amount: quantityValue,
                    order: order._id
                })
            })
                .catch(e => {
                    alert(e.message);
                })
            fetch(`/cartItem/${cartItemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => {
                })
                .catch(e => {
                    alert(e.message);
                })
            let result = window.confirm('Желаете оплатить онлайн?');
            if (!result) {
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
                redirect(`/cart/user/${id}`);
            } else {
                redirect(`/payment/${order.amount}/${order._id}`);
            }
        }
        else alert('Количество должно быть больше нуля');
    }
    return (
        <>
            <Modal
                show={showAddOrderModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Заказать</Modal.Title>
                </Modal.Header>
                <form onSubmit={addOrderSubmit}>
                    <Modal.Body>
                        <div className="mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{food.name}</h5>
                                <p className="card-text">Цена за одно блюдо: {Number(food.price).toFixed(2)} BYN</p>
                            </div>
                            <label htmlFor="amountInput" className="form-label">Выберите количество</label>
                            <input type="number" className="form-control" id="amount-input"
                                   placeholder="Количество" value={quantityValue}
                                   onChange={e => setQuantityValue(e.target.value)}/>
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

export default AddOrderModal;
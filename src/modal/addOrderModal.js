import React, {useEffect, useState} from "react";
import useActions from "../helpers/hooks/useActions";
import {Button, Modal} from "react-bootstrap";
import {useSelector} from "react-redux";

const AddOrderModal = ({closeCallback, cartId, showAddOrderModal}) => {
    const redux = useActions();
    const {id} = useSelector(state => state.user);
    const [amountValue, setAmountValue] = useState('');
    const [paidValue, setPaidValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
    const [courierValue, setCourierValue] = useState('');
    const token = localStorage.getItem('token');
    let crts;
    useEffect(() => {
        (async () => {
            if (token) {
                fetch(`/cart/${cartId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(data => data.json())
                    .then(({_id, food, amount, quantity}) => {
                        setAmountValue(amount);
                        redux.getCurrentCart(_id, food, amount, quantity);
                    })
            }
        })()
    }, [])

    let {_id, food, amount, quantity} = useSelector(state => state.cart);
    const addOrderSubmit = async (e) => {
        e.preventDefault();
        let order;
        if (amountValue > 0) {
            await fetch('/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    amount: amountValue * food.price,
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
                    amount: amountValue,
                    order: order._id
                })
            })
                .catch(e => {
                    alert(e.message);
                })
            fetch(`/cart/${cartId}`, {
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
                fetch(`/order/${order._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        paid: order.paid,
                        address: order.address,
                        status: 'Принят',
                        courier: order.courier
                    })
                })
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
                window.location.assign('/cart');
            } else {
                window.location.assign(`/payment/${order.amount}/${order._id}`);
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
                                <p className="card-text">Цена за одно блюдо: {food.price.toFixed(2)} BYN</p>
                            </div>
                            <label htmlFor="amountInput" className="form-label">Выберите количество</label>
                            <input type="number" className="form-control" id="amount-input"
                                   placeholder="Количество" value={amountValue}
                                   onChange={e => setAmountValue(e.target.value)}/>
                            <label htmlFor="address-input" className="form-label">Адрес</label>
                            <input type="text" className="form-control" id="address-input"
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
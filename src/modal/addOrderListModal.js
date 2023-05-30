import React, {useEffect, useState} from "react";
import useActions from "../helpers/hooks/useActions";
import {Button, Modal} from "react-bootstrap";
import {useSelector} from "react-redux";

const AddOrderListModal = ({closeCallback, showAddOrderListModal}) => {
    const redux = useActions();
    const {id} = useSelector(state => state.user);
    const [amountValue, setAmountValue] = useState('');
    const [paidValue, setPaidValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
    const [courierValue, setCourierValue] = useState('');
    const token = localStorage.getItem('token');
    let amount = 0;
    let crts;
    useEffect(() => {
        (async () => {
            if (token) {
                await fetch(`/carts/user/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(data => data.json())
                    .then(async (carts) => {
                        redux.getCarts(carts);
                        crts = carts;
                    })
            }
        })()
    }, [])
    const addOrderListSubmit = async (e) => {
        let order;
        e.preventDefault();
        await fetch(`/carts/user/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(data => data.json())
            .then(carts => {
                for (let i = 0; i < carts.length; i++) {
                    amount += carts[i].quantity;
                }
                redux.getCarts(carts);
                crts = carts;
            })
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
        for (let i = 0; i < crts.length; i++) {
            await fetch('/orderItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    food: crts[i].food,
                    amount: crts[i].amount,
                    order: order._id
                })
            })
        }
        await fetch(`/carts/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        let result = window.confirm('Желаете оплатить онлайн?');
        if (!result) {
            await fetch(`/order/${order._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    paid: order.paid,
                    address: order.address,
                    status: 'Принят',
                    courier: order.courier
                })
            })
            window.location.reload();
        }
        else {
            window.location.assign(`/payment/${order.amount}/${order._id}`);
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

export default AddOrderListModal;
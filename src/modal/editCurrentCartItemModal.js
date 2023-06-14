import {Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import useActions from "../helpers/hooks/useActions";

const EditCurrentCartItemModal = ({closeCallback, showEditCartItemModal, id}) => {
    const redux = useActions();
    const [foodValue, setFoodValue] = useState('');
    const [quantityValue, setQuantityValue] = useState('');
    const {userId} = useSelector(state => state.user);
    useEffect(() => {
        (async () => {
            fetch(`/cartItem/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(({_id, food, quantity}) => {
                    setQuantityValue(quantity)
                })
        })()
    }, [])
    const editCartItemSubmit = async (e) => {
        e.preventDefault();
        if (quantityValue > 0) {
            fetch(`/cartItem/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    quantity: quantityValue
                })
            })
                .then(data => data.json())
                .then(({message}) => {
                    closeCallback();
                    fetch(`/cartItem/${id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                        .then(data => data.json())
                        .then(({_id, food, quantity, amount}) => {
                            redux.getCurrentCartItem(_id, food, quantity, amount);
                        })
                })
        }
        else alert('Количество должно быть больше нуля');
    }
    return (
        <>
            <Modal
                show={showEditCartItemModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Изменение корзины</Modal.Title>
                </Modal.Header>
                <form onSubmit={editCartItemSubmit}>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="amount-input" className="form-label">Количество порций</label>
                            <input type="number" className="form-control" id="amount-input"
                                   placeholder="Кол-во" value={quantityValue}
                                   onChange={e => setQuantityValue(e.target.value)}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <input className="btn btn-success" type="submit" value="Изменить"/>
                        <Button variant="secondary" onClick={closeCallback}>
                            Закрыть
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default EditCurrentCartItemModal;
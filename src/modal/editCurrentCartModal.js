import {Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const EditCurrentCartModal = ({closeCallback, showEditCartModal, id}) => {
    const [foodValue, setFoodValue] = useState('');
    const [amountValue, setAmountValue] = useState('');
    const {userId} = useSelector(state => state.user);
    useEffect(() => {
        (async () => {
            await fetch(`/cart/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(({_id, food, amount}) => {
                    setAmountValue(amount)
                })
        })()
    }, [])
    const editCartSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/cart/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                amount: amountValue
            })
        })
            .then(data => data.json())
            .then(({message}) => {
                alert(message);
                closeCallback();
                window.location.reload();
            })
    }
    return (
        <>
            <Modal
                show={showEditCartModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Изменение элемента корзины</Modal.Title>
                </Modal.Header>
                <form onSubmit={editCartSubmit}>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="amount-input" className="form-label">Количество блюд</label>
                            <input type="number" className="form-control" id="amount-input"
                                   placeholder="Amount" value={amountValue}
                                   onChange={e => setAmountValue(e.target.value)}/>
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

export default EditCurrentCartModal;
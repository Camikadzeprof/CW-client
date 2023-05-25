import {Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const EditCurrentOrderModal = ({closeCallback, showEditOrderModal, id}) => {
    const [paidValue, setPaidValue] = useState(false);
    const [addressValue, setAddressValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
    const [courierValue, setCourierValue] = useState('');
    const {userId} = useSelector(state => state.user);
    useEffect(() => {
        (async () => {
            await fetch(`/order/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(({_id, amount, paid, address, status, courier}) => {
                    setPaidValue(paid);
                    setAddressValue(address);
                    setStatusValue(status);
                    setCourierValue(courier);
                })
        })()
    }, [])
    const editCartSubmit = async (e) => {
        e.preventDefault();
        if (paidValue && statusValue == "Ожидание оплаты") setStatusValue("Принят");
        await fetch(`/order/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                paid: paidValue,
                address: addressValue,
                status: statusValue,
                courier: courierValue
            })
        })
            .then(data => data.json())
            .then(({message}) => {
                alert(message);
                closeCallback();
                window.location.reload();
            })
    }
    const {_id, amount, paid, address, status, courier} = useSelector(state => state.order);
    return (
        <>
            <Modal
                show={showEditOrderModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Изменение заказа</Modal.Title>
                </Modal.Header>
                <form onSubmit={editCartSubmit}>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="paid-input" className="form-label">Оплачен</label>
                            {paidValue ? <input type="checkbox"  id="paid-input"
                                   checked={true}
                                   onChange={e => setPaidValue(false)}/> : <input type="checkbox" id="paid-input"
                                                                                  checked={false}
                                                                                  onChange={e => setPaidValue(true)}/>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address-input" className="form-label">Адрес доставки</label>
                            <input type="text" className="form-control" id="address-input"
                                   placeholder="Адрес доставки" value={addressValue}
                                   onChange={e => setAddressValue(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status-input" className="form-label">Статус</label>
                            <select className="form-control" id="status-input"
                                    placeholder="Статус" value={statusValue}
                                    onChange={e => setStatusValue(e.target.value)}>
                                <option>Принят</option>
                                <option>Готовится</option>
                                <option>Готов к доставке</option>
                                <option>Выполнен</option>
                            </select>
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

export default EditCurrentOrderModal;
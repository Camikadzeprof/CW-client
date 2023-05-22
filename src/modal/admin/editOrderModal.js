import {Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";

const EditOrderModal = ({closeCallback, showEditOrderModal, id}) => {
    const [amountValue, setAmountValue] = useState('');
    const [paidValue, setPaidValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
    const [courierValue, setCourierValue] = useState('');
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
                    if (status != 'delivered' || 'completed' || 'accepted by courier') {
                        setAmountValue(amount);
                        setPaidValue(paid);
                        setAddressValue(address);
                        setStatusValue(status);
                        setCourierValue(courier)
                    }
                    else {
                        alert('Too late');
                        closeCallback();
                    }
                })
        })()
    }, [])
    const editOrderSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/order/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                amount: amountValue,
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
    return (
        <>
            <Modal
                show={showEditOrderModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Edit Order</Modal.Title>
                </Modal.Header>
                <form onSubmit={editOrderSubmit}>
                    <Modal.Body>
                        <div className="mb3">
                            <label htmlFor="amount-input" className="form-label">Food Name</label>
                            <input type="text" className="form-control" name="name" id="amount-input"
                                   placeholder="Amount" value={amountValue}
                                   onChange={(event) => setAmountValue(event.target.value)}/>
                        </div>
                        <div className="mb3">
                            <label htmlFor="paid-input" className="form-label">Image</label>
                            <input type="text" className="form-control" id="paid-input"
                                   value={paidValue}
                                   onChange={e => setPaidValue(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address-input" className="form-label">Description</label>
                            <input type="text" className="form-control" id="address-input"
                                   placeholder="Address" value={addressValue}
                                   onChange={e => setAddressValue(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status-input" className="form-label">Price</label>
                            <input type="text" className="form-control" id="status-input"
                                   placeholder="Status" value={statusValue}
                                   onChange={e => setStatusValue(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="courier-input" className="form-label">Price</label>
                            <input type="text" className="form-control" id="courier-input"
                                   placeholder="Courier" value={courierValue}
                                   onChange={e => setCourierValue(e.target.value)}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <input className="btn btn-success" type="submit" value="Edit Order"/>
                        <Button variant="secondary" onClick={closeCallback}>
                            Close
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default EditOrderModal;
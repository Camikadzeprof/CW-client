import {Button, Modal} from "react-bootstrap";
import {useState} from "react";

const DeleteOrderModal = ({closeCallback, id, showDeleteOrderModal}) => {
    const deleteOrderClick = async (id) => {
        await fetch(`/order/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(data => data.json())
            .then(({message}) => {
                alert(message);
                closeCallback();
                window.location.reload();
            })
            .catch(e => {
                alert(e.message);
            })
    }
    const check = async (id) => {
        await fetch(`/order/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(data => data.json())
            .then(({_id, amount, paid, address, status, courier}) => {
                if (status != 'delivered' || 'completed' || 'accepted by courier') {
                    deleteOrderClick(id);
                }
                else {
                    alert('Too late');
                    closeCallback();
                }
            })
    }
    return(
        <>
            <Modal
                show={showDeleteOrderModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Delete order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to delete food?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCallback}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => check(id)}>Yeap</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteOrderModal;
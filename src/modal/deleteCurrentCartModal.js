import {Button, Modal} from "react-bootstrap";

const DeleteCurrentCartModal = ({closeCallback, id, showDeleteCartModal}) => {
    const deleteCartClick = async (id) => {
        await fetch(`/cart/${id}`, {
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
    return(
        <>
            <Modal
                show={showDeleteCartModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Delete cart item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to delete cart item?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCallback}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => deleteCartClick(id)}>Yeap</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteCurrentCartModal;
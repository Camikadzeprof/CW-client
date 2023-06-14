import {Button, Modal} from "react-bootstrap";

const DeleteCurrentCartItemModal = ({closeCallback, id, showDeleteCartItemModal}) => {
    const deleteCartItemClick = async (id) => {
        fetch(`/cartItem/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(data => data.json())
            .then(({message}) => {
                alert(message);
                closeCallback();
                window.location.assign('/cart');
            })
            .catch(e => {
                alert(e.message);
            })
    }
    return(
        <>
            <Modal
                show={showDeleteCartItemModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Убрать из корзины</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы действительно хотите убрать это блюдо из корзины?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCallback}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={() => deleteCartItemClick(id)}>Убрать</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteCurrentCartItemModal;
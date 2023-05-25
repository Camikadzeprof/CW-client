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
                    <Modal.Title>Убрать из корзины</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы действительно хотите убрать это блюдо из корзины?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCallback}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={() => deleteCartClick(id)}>Убрать</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteCurrentCartModal;
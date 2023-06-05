import {Button, Modal} from "react-bootstrap";
import useActions from "../../helpers/hooks/useActions";

const DeleteCurrentOrderModal = ({closeCallback, id, showDeleteOrderModal}) => {
    const redux = useActions();
    const deleteOrderClick = async (id) => {
        fetch(`/order/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(data => data.json())
            .then(({message}) => {
                closeCallback();
                window.location.assign(`/orders`);
            })
            .catch(e => {
                alert(e.message);
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
                    <Modal.Title>Удаление заказа</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы действительно хотите удалить этот заказ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCallback}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={() => deleteOrderClick(id)}>Да</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteCurrentOrderModal;
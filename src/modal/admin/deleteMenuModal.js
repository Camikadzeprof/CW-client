import {Button, Modal} from "react-bootstrap";

const DeleteMenuModal = ({closeCallback, id, showDeleteMenuModal}) => {
    const deleteMenuClick = async (id) => {
        await fetch(`/menu/${id}`, {
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
                show={showDeleteMenuModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Удаление блюда</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы действительно хотите удалить данное блюдо из меню?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCallback}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={() => deleteMenuClick(id)}>Удалить</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteMenuModal;
import {Button, Modal} from "react-bootstrap";

const DeleteTypeModal = ({closeCallback, typeName, showDeleteTypeModal}) => {
    const deleteTypeClick = async (typeName) => {
        await fetch(`/type/${typeName}`, {
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
                show={showDeleteTypeModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Удалить тип</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы действительно хотите удалить данный тип?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCallback}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={() => deleteTypeClick(typeName)}>Удалить</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteTypeModal;
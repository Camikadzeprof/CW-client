import {Button, Modal} from "react-bootstrap";
import useActions from "../../helpers/hooks/useActions";

const DeleteUserModal = ({closeCallback, showDeleteUserModal, userId}) => {
    const redux = useActions();
    const deleteUserClick = async (userId) => {
        fetch(`/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(data => data.json())
            .then(({message}) => {
                closeCallback();
                fetch('/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(data => data.json())
                    .then(users => {
                        redux.getAllUsers(users);
                    })
            })
            .catch(e => {
                alert(e.message);
            })
    }
    return (
        <>
            <Modal
                show={showDeleteUserModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Удаление пользователя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы действительно хотите удалить данного пользователя?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCallback}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={() => deleteUserClick(userId)}>Удалить</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteUserModal;
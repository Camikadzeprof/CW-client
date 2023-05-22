import {Button, Modal} from "react-bootstrap";

const DeleteUserModal = ({closeCallback, showDeleteUserModal, userId}) => {
    const deleteUserClick = async (userId) => {
        await fetch(`/user/${userId}`, {
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
    return (
        <>
            <Modal
                show={showDeleteUserModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to delete user?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCallback}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => deleteUserClick(userId)}>Yeap</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteUserModal;
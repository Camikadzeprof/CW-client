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
                    <Modal.Title>Delete food</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to delete food?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCallback}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => deleteMenuClick(id)}>Yeap</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteMenuModal;
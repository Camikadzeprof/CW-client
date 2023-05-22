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
                    <Modal.Title>Delete type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to delete type?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCallback}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => deleteTypeClick(typeName)}>Yeap</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteTypeModal;
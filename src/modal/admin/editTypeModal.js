import {Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";

const EditTypeModal = ({closeCallback, showEditTypeModal, typeName}) => {
    const [nameValue, setNameValue] = useState(typeName);
    const [idValue, setIdValue] = useState('');
    useEffect(() => {
        (async () => {
            await fetch(`/type/${typeName}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(({_id}) => {
                    setIdValue(_id);
                })
        })()
    }, [])
    const editTypeSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/type/${idValue}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: nameValue
            })
        })
            .then(data => data.json())
            .then(({message}) => {
                alert(message);
                closeCallback();
            })
    }
    return (
        <>
            <Modal
                show={showEditTypeModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Edit Type</Modal.Title>
                </Modal.Header>
                <form onSubmit={editTypeSubmit}>
                    <Modal.Body>
                        <label htmlFor="type-input" className="form-label">Topic Name</label>
                        <input type="text" className="form-control" name="type" id="type-input"
                               placeholder="Name" value={nameValue}
                               onChange={(event) => setNameValue(event.target.value)}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <input className="btn btn-success" type="submit" value="Edit Type"/>
                        <Button variant="secondary" onClick={closeCallback}>
                            Close
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default EditTypeModal;
import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";

const AddTypeModal = ({closeCallback, showAddTypeModal}) => {
    const [nameValue, setNameValue] = useState('');
    const addTypeSubmit = async (e) => {
        e.preventDefault();
        await fetch('/type', {
            method: 'POST',
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
                window.location.reload();
            })
            .catch(e => {
                alert(e.message)
            })

    }
    return (
        <>
            <Modal
                show={showAddTypeModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Add Food Type</Modal.Title>
                </Modal.Header>
                <form onSubmit={addTypeSubmit}>
                    <Modal.Body>
                        <label htmlFor="type-input" className="form-label">Type Name</label>
                        <input type="text" className="form-control" name="type" id="type-input"
                               placeholder="Name" value={nameValue}
                               onChange={(event) => setNameValue(event.target.value)}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <input className="btn btn-success" type="submit" value="Add Type"/>
                        <Button variant="secondary" onClick={closeCallback}>
                            Close
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default AddTypeModal;
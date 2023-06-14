import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import useActions from "../../helpers/hooks/useActions";

const AddTypeModal = ({closeCallback, showAddTypeModal}) => {
    const [nameValue, setNameValue] = useState('');
    const redux = useActions();
    const addTypeSubmit = async (e) => {
        e.preventDefault();
        fetch('/type', {
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
                if (message === 'Тип успешно добавлен') {
                    closeCallback();
                    fetch('/type', {
                        method: 'GET'
                    })
                        .then(data => data.json())
                        .then(types => {
                            redux.getTypes(types);
                        })
                }
                else {
                    alert(message);
                }
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
                    <Modal.Title>Добавить тип блюд</Modal.Title>
                </Modal.Header>
                <form onSubmit={addTypeSubmit}>
                    <Modal.Body>
                        <label htmlFor="type-input" className="form-label">Название типа</label>
                        <input type="text" className="form-control" name="type" id="type-input" required="true"
                               placeholder="Название" value={nameValue}
                               onChange={(event) => setNameValue(event.target.value)}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <input className="btn btn-success" type="submit" value="Добавить"/>
                        <Button variant="secondary" onClick={closeCallback}>
                            Закрыть
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default AddTypeModal;
import {Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import useActions from "../../helpers/hooks/useActions";

const EditTypeModal = ({closeCallback, showEditTypeModal, typeName}) => {
    const [nameValue, setNameValue] = useState(typeName);
    const [idValue, setIdValue] = useState('');
    const redux = useActions();
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
        fetch(`/type/${idValue}`, {
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
                closeCallback();
                fetch('/type', {
                    method: 'GET'
                })
                    .then(data => data.json())
                    .then(types => {
                        redux.getTypes(types);
                    })
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
                    <Modal.Title>Редактировать тип</Modal.Title>
                </Modal.Header>
                <form onSubmit={editTypeSubmit}>
                    <Modal.Body>
                        <label htmlFor="type-input" className="form-label">Название типа</label>
                        <input type="text" className="form-control" name="type" id="type-input"
                               placeholder="Название" value={nameValue}
                               onChange={(event) => setNameValue(event.target.value)}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <input className="btn btn-success" type="submit" value="Редактировать"/>
                        <input className="btn btn-danger" type="button" onClick={closeCallback} value="Закрыть"/>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default EditTypeModal;
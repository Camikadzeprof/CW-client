import {Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";

const EditMenuModal = ({closeCallback, showEditMenuModal, id}) => {
    const [nameValue, setNameValue] = useState('');
    const [typeValue, setTypeValue] = useState('');
    const [imgValue, setImgValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    useEffect(() => {
        (async () => {
            await fetch(`/menu/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(({_id, name, type, img, description, price}) => {
                    setNameValue(name);
                    setImgValue(img);
                    setDescriptionValue(description);
                    setPriceValue(price);
                })
        })()
    }, [])
    const editMenuSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/menu/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: nameValue,
                img: imgValue,
                description: descriptionValue,
                price: priceValue
            })
        })
            .then(data => data.json())
            .then(({message}) => {
                alert(message);
                closeCallback();
                window.location.reload();
            })
    }
    return (
        <>
            <Modal
                show={showEditMenuModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Редактировать блюдо</Modal.Title>
                </Modal.Header>
                <form onSubmit={editMenuSubmit}>
                    <Modal.Body>
                        <div className="mb3">
                            <label htmlFor="name-input" className="form-label">Название блюда</label>
                            <input type="text" className="form-control" name="name" id="name-input"
                                   placeholder="Название" value={nameValue}
                                   onChange={(event) => setNameValue(event.target.value)}/>
                        </div>
                        <div className="mb3">
                            <label htmlFor="img-input" className="form-label">Изображение</label>
                            <input type="text" className="form-control" id="img-input"
                                   aria-describedby="imgHelp" value={imgValue}
                                   onChange={e => setImgValue(e.target.value)}/>
                            <div id="imgHelp" className="form-text">Введите URL изображения.
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description-input" className="form-label">Описание</label>
                            <input type="text" className="form-control" id="description-input"
                                   placeholder="Описание" value={descriptionValue}
                                   onChange={e => setDescriptionValue(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price-input" className="form-label">Цена</label>
                            <input type="text" className="form-control" id="price-input"
                                   placeholder="Цена" pattern="^[0-9]*[.]?[0-9]+$" value={priceValue}
                                   onChange={e => setPriceValue(e.target.value)}/> BYN
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <input className="btn btn-success" type="submit" value="Редактировать"/>
                        <Button variant="secondary" onClick={closeCallback}>
                            Закрыть
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default EditMenuModal;
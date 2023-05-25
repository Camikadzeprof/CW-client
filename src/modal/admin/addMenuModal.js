import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";

const AddMenuModal = ({closeCallback, showAddMenuModal}) => {
    const [nameValue, setNameValue] = useState('');
    const [typeValue, setTypeValue] = useState('');
    const [imgValue, setImgValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const addMenuSubmit = async (e) => {
        e.preventDefault();
        await fetch('/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: nameValue,
                type: typeValue,
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
            .catch(e => {
                alert(e.message)
            })

    }
    return (
        <>
            <Modal
                show={showAddMenuModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Добавить блюдо</Modal.Title>
                </Modal.Header>
                <form onSubmit={addMenuSubmit}>
                    <Modal.Body>
                        <div className="mb3">
                            <label htmlFor="name-input" className="form-label">Название блюда</label>
                            <input type="text" className="form-control" name="name" id="name-input"
                                   placeholder="Название" value={nameValue}
                                   onChange={(event) => setNameValue(event.target.value)}/>
                        </div>
                        <div className="mb3">
                            <label htmlFor="type-input" className="form-label">Тип блюда</label>
                            <input type="text" className="form-control" name="name" id="type-input"
                                   placeholder="Тип" value={typeValue}
                                   onChange={(event) => setTypeValue(event.target.value)}/>
                        </div>
                        <div className="mb3">
                            <label htmlFor="img-input" className="form-label">изображение</label>
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
                                   placeholder="Цена" value={priceValue}
                                   onChange={e => setPriceValue(e.target.value)}/> BYN
                        </div>
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

export default AddMenuModal;
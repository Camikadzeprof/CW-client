import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import useActions from "../../helpers/hooks/useActions";

const AddMenuModal = ({closeCallback, showAddMenuModal}) => {
    const redux = useActions();
    const [nameValue, setNameValue] = useState('');
    const [typeValue, setTypeValue] = useState('');
    const [imgValue, setImgValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const addMenuSubmit = async (e) => {
        e.preventDefault();
        fetch('/menu', {
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
                if (message === 'Введите существующий тип' || message === 'Такое блюдо уже существует')
                    alert(message);
                else {
                    closeCallback();
                    fetch('/menu', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                        .then(data => data.json())
                        .then(menus => {
                            redux.getMenu(menus);
                        })
                        .catch(e => {
                            console.log(e.message)
                        })
                }

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
                            <label htmlFor="name-input" className="form-label">*Название блюда</label>
                            <input type="text" className="form-control" name="name" id="name-input" required="true"
                                   placeholder="Название" value={nameValue}
                                   onChange={(event) => setNameValue(event.target.value)}/>
                        </div>
                        <div className="mb3">
                            <label htmlFor="type-input" className="form-label">*Тип блюда</label>
                            <input type="text" className="form-control" name="name" id="type-input" required="true"
                                   placeholder="Тип" value={typeValue}
                                   onChange={(event) => setTypeValue(event.target.value)}/>
                        </div>
                        <div className="mb3">
                            <label htmlFor="img-input" className="form-label">*Изображение</label>
                            <input type="text" className="form-control" id="img-input" required="true"
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
                            <label htmlFor="price-input" className="form-label">*Цена</label>
                            <input type="text" className="form-control" id="price-input" required="true"
                                   placeholder="Цена" pattern="^[0-9]*[.]?[0-9]+$" value={priceValue}
                                   onChange={e => setPriceValue(e.target.value)}/> BYN
                        </div>
                        *Поля, обязательные для заполнения
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
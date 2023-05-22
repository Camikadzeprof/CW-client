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
                    <Modal.Title>Add Food</Modal.Title>
                </Modal.Header>
                <form onSubmit={addMenuSubmit}>
                    <Modal.Body>
                        <div className="mb3">
                            <label htmlFor="name-input" className="form-label">Food Name</label>
                            <input type="text" className="form-control" name="name" id="name-input"
                                   placeholder="Name" value={nameValue}
                                   onChange={(event) => setNameValue(event.target.value)}/>
                        </div>
                        <div className="mb3">
                            <label htmlFor="type-input" className="form-label">Food Name</label>
                            <input type="text" className="form-control" name="name" id="type-input"
                                   placeholder="Type" value={typeValue}
                                   onChange={(event) => setTypeValue(event.target.value)}/>
                        </div>
                        <div className="mb3">
                            <label htmlFor="img-input" className="form-label">Image</label>
                            <input type="text" className="form-control" id="img-input"
                                   aria-describedby="imgHelp" value={imgValue}
                                   onChange={e => setImgValue(e.target.value)}/>
                            <div id="imgHelp" className="form-text">Enter the image URL.
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description-input" className="form-label">Description</label>
                            <input type="text" className="form-control" id="description-input"
                                   placeholder="Description" value={descriptionValue}
                                   onChange={e => setDescriptionValue(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price-input" className="form-label">Price</label>
                            <input type="text" className="form-control" id="price-input"
                                   placeholder="Price" value={priceValue}
                                   onChange={e => setPriceValue(e.target.value)}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <input className="btn btn-success" type="submit" value="Add Food"/>
                        <Button variant="secondary" onClick={closeCallback}>
                            Close
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default AddMenuModal;
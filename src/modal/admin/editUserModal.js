import React, {useEffect, useState} from "react";
import Modal from "../../elements/modal";
import ModalCloseButton from "../../elements/modalCloseButton";

const EditUserModal = ({closeCallback, userId}) => {
    const [emailValue, setEmailValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    useEffect(() => {
        (async () => {
            await fetch(`/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(({email, phone}) => {
                    setEmailValue(email);
                    setPhoneValue(phone);
                })
        })()
    }, [])

    const editUserSubmit = async (event) => {
        event.preventDefault();
        await fetch(`/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                email: emailValue,
                phone: phoneValue
            })
        })
            .then(data => data.json())
            .then(({message}) => {
                alert(message);
                closeCallback();
                window.location.reload();
            })
            .catch(e => {
                alert(e.message);
            })
    }

    return (
        <Modal>
            <ModalCloseButton closeCallback={closeCallback}/>
            <div className="edit-user-div">
                <div className="container">
                    <form onSubmit={editUserSubmit}>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="email-input" className="form-label">E-Mail</label>
                                    <input type="email" className="form-control" id="email-input"
                                           value={emailValue} onChange={e => setEmailValue(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone-input" className="form-label">Phone</label>
                                    <input type="phone" className="form-control" id="phone-input"
                                           value={phoneValue} onChange={e => setPhoneValue(e.target.value)}/>
                                </div>
                            </div>

                        </div>
                        <input className="btn btn-success" type="submit" value="Edit"/>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default EditUserModal;
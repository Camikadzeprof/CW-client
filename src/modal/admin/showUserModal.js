import Modal from "../../elements/modal";
import ModalCloseButton from "../../elements/modalCloseButton";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import '../../css/showUser.css'

const ShowUserModal = ({closeCallback, userId}) => {
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

    return (
        <Modal>
            <ModalCloseButton closeCallback={closeCallback}/>
            <div className="show-user-div">
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="email-input" className="form-label"><b>E-Mail</b></label>
                            <p id="email-input">{emailValue}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone-input" className="form-label"><b>Телефон</b></label>
                            <p id="phone-input">{phoneValue}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
export default ShowUserModal;
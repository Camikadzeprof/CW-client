import Modal from "../elements/modal";
import ModalCloseButton from "../elements/modalCloseButton";
import '../css/editUser.css'
import {useSelector} from "react-redux";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import useActions from "../helpers/hooks/useActions";

const EditUserModal = ({closeCallback}) => {
    const {email, phone} = useSelector(state => state.user);
    const [emailValue, setEmailValue] = useState(email);
    const [phoneValue, setPhoneValue] = useState(phone);
    const redux = useActions();

    const {id} = useParams();
    const editUserSubmit = async (event) => {
        event.preventDefault();
        await fetch(`/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                email: emailValue,
                phone: phoneValue
            })
        }).then(() => {
            closeCallback();
            redux.getUserById(emailValue, phoneValue);
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
                                    <label htmlFor="phone-input" className="form-label">Телефон</label>
                                    <input type="text" className="form-control" id="phone-input"
                                           value={phoneValue} pattern="[0-9]{12}" onChange={e => setPhoneValue(e.target.value)}/>
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
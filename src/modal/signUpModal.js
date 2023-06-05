import React, {useState} from "react";
import Modal from "../elements/modal";
import '../css/signUp.css'
import ModalCloseButton from "../elements/modalCloseButton";

const SignUpModal = ({closeCallback}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const checkFields = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }
        if (password.length < 6) {
            alert('Длина пароля должна быть как минимум 6 символов');
            return;
        }
        await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: login,
                email: email,
                phone: phone,
                password: password
            })
        })
            .then(data => data.json())
            .then(({message}) => {
                alert(message);
                closeCallback();
            })
            .catch(e => {
                alert(e.message);
            });
    }
    return (
        <Modal>
            <ModalCloseButton closeCallback={closeCallback}/>
            <form onSubmit={checkFields}>
                <div className="signUp-div">
                    <p className="signUp-paragraph">Sign Up</p>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <div className="mb-3">
                                    <label htmlFor="email-input" className="form-label">Email адрес</label>
                                    <input type="email" className="form-control" id="email-input"
                                           aria-describedby="emailHelp"
                                           value={email} onChange={e => setEmail(e.target.value)}/>
                                    <div id="emailHelp" className="form-text">Мы не будем разглашать ваш e-mail адрес кому-либо.
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone-input" className="form-label">Номер телефона</label>
                                    <input type="text" className="form-control" id="phone-input"
                                           aria-describedby="phoneHelp" required="true" pattern="[0-9]{12}"
                                           value={phone} onChange={e => setPhone(e.target.value)}/>
                                    <div id="phoneHelp" className="form-text">Мы не будем разглашать ваш номер телефона кому-либо.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col order-1">
                            <div className="mb-3">
                                <label htmlFor="login-input" className="form-label">Логин</label>
                                <input type="text" className="form-control" id="login-input" placeholder="Логин"
                                       value={login} onChange={e => setLogin(e.target.value)}/>
                                <div className="mb-3">
                                    <label htmlFor="password-input" className="form-label">Пароль</label>
                                    <input type="password" className="form-control" id="password-input" placeholder="Пароль"
                                           value={password} onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword-input" className="form-label">Подтвердите пароль</label>
                                    <input type="password" className="form-control" id="confirmPassword-input" placeholder="Пароль еще раз"
                                           value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <input className="btn btn-success" type="submit" value="Зарегистрироваться"/>
                </div>
            </form>
        </Modal>
    );
}

export default SignUpModal
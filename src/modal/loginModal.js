import React, {useEffect, useState} from 'react'
import Modal from "../elements/modal";
import '../css/login.css';
import useActions from "../helpers/hooks/useActions";
import {useHistory} from "react-router-dom";
import socket from "../components/socket";
import ModalCloseButton from "../elements/modalCloseButton";

const LoginModal = ({closeCallback}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const redux = useActions();
    const history = useHistory();
    const redirect = (path) => {
        history.push(path);
    }
    const checkFields = async (event) => {
        event.preventDefault();
        await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        }).then(res => res.json())
            .then(user => {
                redux.authUser(user['user'].id, user['user'].username, user['user'].role, user.token, user.success);
                closeCallback();
                socket.emit('JOIN', {username: user['user'].username});
                redirect(`/profile/${user['user'].id}`);
                localStorage.setItem('token', user.token);
            })
            .catch(e => {
                alert('Please check field correctness');
            })
    }
    useEffect(() => {
        socket.on("SOCKET_DATA", data => {
            redux.setChatData(data);
        })
    }, [])
    return (
        <Modal>
            <ModalCloseButton closeCallback={closeCallback}/>
            <form onSubmit={checkFields}>
                <div className="login-div">
                    <p className="login-paragraph" align="center">Log in</p>
                    <div className="container">
                        <div className="mb-3">
                            <label htmlFor="login-input" className="form-label">Login</label>
                            <input type="text" className="form-control" name="login" id="login-input"
                                   placeholder="login" value={login}
                                   onChange={(event) => setLogin(event.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password-input" className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" id="password-input"
                                   placeholder="password" value={password}
                                   onChange={(event) => setPassword(event.target.value)}/>
                        </div>
                    </div>
                    <input className="btn btn-success" type="submit" value="Log In"/>
                </div>
            </form>
        </Modal>
    )
}
export default LoginModal
import React, {useState} from 'react'
import {NavLink, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import useActions from "../helpers/hooks/useActions";
import socket from "./socket";
import LoginModal from "../modal/loginModal";
import SignUpModal from "../modal/signUpModal";


const Sidebar = (props) => {
    const [showLogInModal, toggleLogInModal] = useState(false);
    const [showSignUpModal, toggleSignUpModal] = useState(false);
    const history = useHistory();
    const redirect = (path) => history.push(path);
    const redux = useActions();
    const {id, username, email, phone, role} = useSelector(state => state.user);
    const logout = async () => {
        await fetch('/logout', {
            method: 'POST'
        }).then(res => res.json())
            .then(value => {
                console.log(value.message);
                localStorage.removeItem('token');
                redux.logoutUser();
                redux.clearTypes();
                socket.emit("USER_DISCONNECTED", username);
                socket.disconnect();
                redirect('/');
            })
    }
    return (
        <div className="wrapper">
            {showLogInModal ? (
                <LoginModal
                    closeCallback={() => toggleLogInModal(false)}
                />
            ) : null}
            {showSignUpModal ? <SignUpModal closeCallback={() => toggleSignUpModal(false)}/> : null}
            <div className="sidebar">
                <h2>Доставка еды</h2>
                <ul>
                    <li>
                        <span>{username ? username : null}</span>
                        {username ? <div className="logout-button">
                            <button type="button" onClick={logout}>Выйти</button>
                        </div> : <div className="auth-buttons">
                            <button type="button" onClick={() => {
                                toggleLogInModal(true)
                            }}>Войти
                            </button>
                            <button type="button" onClick={() => {
                                toggleSignUpModal(true)
                            }}>Регистрация
                            </button>
                        </div>}
                    </li>
                    {role === 'admin' ?
                        <li><NavLink to="/admin" exact activeClassName="active"><i className="fas fa-user-cog"/>Администрирование</NavLink></li> : null}
                    <li><NavLink to="/" exact activeClassName="active"><i className="fas fa-home"/>Главная</NavLink>
                    </li>
                    <li><NavLink to={`/profile/${id}`} activeClassName="active"><i
                        className="fas fa-user"/>Профиль</NavLink></li>
                    <li><NavLink to="/type" activeClassName="active"><i className="fas fa-book"/>Меню</NavLink>
                    </li>
                    {(role !== 'courier' && role !== 'admin' && role !== 'operator') ?
                    <li><NavLink to="/cart" activeClassName="active"><i className="fas fa-shopping-cart"/>Корзина</NavLink>
                    </li> : null}
                    <li><NavLink to="/order" activeClassName="active"><i className="fas fa-badge-dollar" />Заказы</NavLink>
                    </li>
                    <li><NavLink to="/chat" activeClassName="active"><i
                        className="fas fa-paper-plane"/>Чат</NavLink></li>
                </ul>
            </div>
        </div>
    );
}
export default Sidebar;
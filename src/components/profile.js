import React, {useEffect, useState} from "react";
import '../css/profile.css';
import {useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import useActions from "../helpers/hooks/useActions";
import EditUserModal from "../modal/editUserModal";

const Profile = () => {
    const [showEditUserModal, toggleEditUserModal] = useState(false);
    const redux = useActions();
    const {id} = useParams();
    const history = useHistory();
    const redirect = (path) => history.push(path);
    useEffect(() => {
        (async () => {
            await fetch(`/user/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(value => value.json())
                .then(({email, phone}) => {
                    redux.getUserById(email, phone);
                })
                .catch(e => {
                    alert(e.message);
                })
            if (role === 'user') {
                await fetch(`/orders/user/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(data => data.json())
                    .then(orders => {
                        redux.getOrders(orders);
                    })
            }
            else if (role === 'courier') {
                await fetch(`/orders/courier/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(data => data.json())
                    .then(orders => {
                        redux.getOrders(orders);
                    })
            }
        })()
    }, [])
    const {
        username,
        email,
        phone,
        role,
    } = useSelector(state => state.user);
    const {orders} = useSelector(state => state.order);
    return (
        <>
            {showEditUserModal ? (<EditUserModal closeCallback={() => toggleEditUserModal(false)}/>) : null}
            <div className="main_content">
                <div className="info">
                    <div className="container">
                        <div className="main-body">
                            <div className="row gutters-sm">
                                <div className="col-md-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <div className="mt-3">
                                                    <h4>{username}</h4>
                                                    <p className="text-secondary mb-1">{role === 'user' ? 'Пользователь сервиса' : ((role === 'courier') ? 'Курьер' : 'Администратор')}</p>
                                                    <button className="btn btn-primary"
                                                            onClick={() => toggleEditUserModal(true)}>Edit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Имя пользователя</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {username}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Электронная почта</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {email}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Телефон</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {phone}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    {role !== "admin" ? <div className="row gutters-sm">
                                        <div>
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <h6 className="d-flex align-items-center mb-3">
                                                        <i className="fas fa-bookmark"/>
                                                        Мои заказы
                                                    </h6>

                                                    <ul className="list-group">
                                                        {orders.length > 0 ? (orders.map(({_id, amount, paid, address, status, courier, createdBy, createdAt}) => (
                                                            (role === "courier" && status === "Доставляется") ? (<li className="list-group-item">
                                                                <div id="list-span">
                                                                    <small>{_id}</small>
                                                                    <small style={{marginLeft:"20px"}} id="span_amount">{amount}</small>
                                                                    {paid ? (<small style={{marginLeft:"20px", color:"green"}} id="span-paid">Оплачен</small>) : (<small style={{marginLeft:"20px", color:"red"}} id="span-paid">Не оплачен</small>)}
                                                                    <small style={{marginLeft:"20px"}} id="span-status">{status}</small>
                                                                </div>
                                                                <div className="btn-group" role="group"
                                                                     aria-label="Basic outlined example">
                                                                    <button
                                                                        onClick={() => redirect(`/order/${_id}`)}
                                                                        className="btn btn-outline-primary">Показать
                                                                    </button>
                                                                </div>
                                                            </li>) : (role === "user" ?
                                                                <li className="list-group-item">
                                                                    <div id="list-span">
                                                                        <small>{_id}</small>
                                                                        <small style={{marginLeft:"20px"}} id="span_amount">{amount.toFixed(2)}</small>
                                                                        {paid ? (<small style={{marginLeft:"20px", color:"green"}} id="span-paid">Оплачен</small>) : (<small style={{marginLeft:"20px", color:"red"}} id="span-paid">Не оплачен</small>)}
                                                                        <small style={{marginLeft:"20px"}} id="span-status">{status}</small>
                                                                    </div>
                                                                    <div className="btn-group" role="group"
                                                                         aria-label="Basic outlined example">
                                                                        <button
                                                                            onClick={() => redirect(`/order/${_id}`)}
                                                                            className="btn btn-outline-primary">Показать
                                                                        </button>
                                                                    </div>
                                                                </li> : null)
                                                        ))) : (
                                                            <li className="list-group-item">
                                                                <div id="list-span">
                                                                    <span id="span_username">Нет заказов</span>
                                                                </div>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile;
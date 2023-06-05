import React, {useEffect, useState} from "react";
import useActions from "../helpers/hooks/useActions";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

const Order = (props) => {
    const redux = useActions();
    const {id, role} = useSelector(state => state.user);
    const token = localStorage.getItem('token');
    const stat = 'Готов к доставке';
    useEffect(() => {
        (async () => {
            if (role === 'admin' || role === 'operator') {
                if (token) {
                    fetch(`/orders`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(data => data.json())
                        .then(orders => {
                            redux.getOrders(orders);
                        })
                }
            }
            else if (role === 'user') {
                if (token) {
                    fetch(`/orders/user/${id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(data => data.json())
                        .then(orders => {
                            redux.getOrders(orders);
                        })
                }
            }
            else if (role === 'courier') {
                if (token) {
                    fetch(`/orders/status/${stat}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(data => data.json())
                        .then(orders => {
                            redux.getOrders(orders);
                        })
                }
            }
        })()
    }, [])
    const {orders} = useSelector(state => state.order);

    return (
        <div className="main_content">
            <div className="info">
                <h2>Заказы</h2>
                <ul className="list-group">
                    {orders.length > 0 ? orders.map((order, index) => (
                        <li key={index} className="list-group-item">
                            <div id="list-span">
                                <small id="span_id" style={{marginRight: "50px", width: "150px"}}>{order._id}</small>
                            </div>
                            <div id="list-span">
                                <small style={{width: "80px"}} id="span_amount">{order.amount.toFixed(2)} BYN</small>
                            </div>
                            <div id="list-span">
                                {order.paid ? (<small style={{marginLeft: "50px", width: "80px"}} id="span_paid" style={{color: "green"}}>Оплачен</small>)
                                    : (<small style={{marginLeft: "50px", width: "80px"}} id="span_paid" style={{color: "red"}}>Не оплачен</small>)}
                            </div>
                            <div id="list-span">
                                <small style={{marginLeft: "50px", width: "220px"}} id="span_address">{order.address}</small>
                            </div>
                            <div id="list-span">
                                <small style={{marginLeft: "50px", width: "60px"}} id="span_status">{order.status}</small>
                            </div>
                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                                <NavLink to={`/order/${order._id}`} exact
                                         className="btn btn-outline-primary">Показать</NavLink>
                            </div>
                        </li>
                    )) : <h5>Нет заказов</h5>}
                </ul>
            </div>
        </div>
    )
}
export default Order;
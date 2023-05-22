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
            if (role === 'admin') {
                if (token) {
                    await fetch(`/orders`, {
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
                    await fetch(`/orders/user/${id}`, {
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
                    await fetch(`/orders/status/${stat}`, {
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
                    {orders && orders.map((order, index) => (
                        <li key={index} className="list-group-item">
                            <div id="list-span">
                                <small id="span_id">{order._id}</small>
                            </div>
                            <div id="list-span">
                                <small style={{marginLeft: "50px"}} id="span_amount">{order.amount.toFixed(2)}</small>
                            </div>
                            <div id="list-span">
                                {order.paid ? (<small style={{marginLeft: "50px"}} id="span_paid" style={{color: "green"}}>Оплачен</small>)
                                    : (<small style={{marginLeft: "50px"}} id="span_paid" style={{color: "red"}}>Не оплачен</small>)}
                            </div>
                            <div id="list-span">
                                <small style={{marginLeft: "50px"}} id="span_address">{order.address}</small>
                            </div>
                            <div id="list-span">
                                <small style={{marginLeft: "50px"}} id="span_status">{order.status}</small>
                            </div>
                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                                <NavLink to={`/order/${order._id}`} exact
                                         className="btn btn-outline-primary">Показать</NavLink>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Order;
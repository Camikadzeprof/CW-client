import {NavLink, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useActions from "../helpers/hooks/useActions";
import {useSelector} from "react-redux";
import EditCurrentOrderModal from "../modal/admin/editCurrentOrderModal";
import DeleteCurrentOrderModal from "../modal/admin/deleteCurrentOrderModal";

const CurrentOrder = () => {
    const [showEditOrderModal, toggleEditOrderModal] = useState(false);
    const [showDeleteOrderModal, toggleDeleteOrderModal] = useState(false);
    const [currentOrderIdValue, setCurrentOrderIdValue] = useState(null);
    const redux = useActions();
    const {orderId} = useParams();
    const {id, role} = useSelector(state => state.user);

    useEffect(() => {
        (async () => {
            fetch(`/order/${orderId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(({_id, amount, paid, address, status, courier, createdBy, createdAt}) => {
                    redux.getCurrentOrder(_id, amount, paid, address, status, courier, createdBy, createdAt);
                })
            fetch(`/orderItems/${orderId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(orderItems => {
                    redux.getOrderItems(orderItems);
                })
        })()
    }, [])
    const {_id, amount, paid, address, status, courier, createdBy, createdAt} = useSelector(state => state.order);
    const {orderItems} = useSelector(state => state.orderItem)
    async function acceptForDeliveryClick() {
        fetch(`/order/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                paid: paid,
                address: address,
                status: 'Доставляется',
                courier: id
            })
        })
            .then(data => window.location.reload())
    }
    async function deliveredClick() {
        fetch(`/order/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                paid: true,
                address: address,
                status: 'Выполнен',
                courier: courier
            })
        })
            .then(data => window.location.reload())
    }

    return (
        <>
            {showEditOrderModal ? <EditCurrentOrderModal closeCallback={() => toggleEditOrderModal(false)}
                                                       showEditOrderModal={showEditOrderModal}
                                                       id={currentOrderIdValue}/> : null}
            {showDeleteOrderModal ?
                <DeleteCurrentOrderModal closeCallback={() => toggleDeleteOrderModal(false)} id={currentOrderIdValue}
                                        showDeleteOrderModal={showDeleteOrderModal}/> : null}
            <div className="main_content">
                <div className="info">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{_id}</h5>
                            <p className="card-text">Сумма: {Number(amount).toFixed(2)} BYN</p>
                            {paid ? <p style={{color:"green"}} className="card-text">Оплачен</p> : <p style={{color:"red"}} className="card-text">Не оплачен</p>}
                            <p className="card-text">Адрес доставки: {address}</p>
                            <p className="card-text">Статус: {status}</p>
                            <p className="card-text">Добавлен: {new Date(createdAt).toLocaleDateString('en-US')}</p>
                        </div>
                    </div>
                    {orderItems && orderItems.map((orderItem, index) => (
                        <li key={index} className="list-group-item">
                            <div id="list-span">
                                <span id="span_food">{orderItem.food.name}</span>
                                <span id="span_amount">{orderItem.amount}</span>
                            </div>
                        </li>
                    ))}
                    {role === "admin" && status !== "Выполнен" ? <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" className="btn btn-success" onClick={() => {
                            setCurrentOrderIdValue(_id);
                            toggleEditOrderModal(true);
                        }}>Редактировать
                        </button>
                        {paid ? null : <button type="button" style={{marginLeft: "5px"}} className="btn btn-danger" onClick={() => {
                            setCurrentOrderIdValue(_id);
                            toggleDeleteOrderModal(true);
                        }}>Удалить
                        </button>}
                    </div> : null}
                    {role === "operator" && status !== "Выполнен" ? <div className="btn-group" role="group" aria-label="Basic outlined example">
                        {status === "Готов к доставке" || status === "Доставляется" ? null : <button type="button" className="btn btn-success" onClick={() => {
                            setCurrentOrderIdValue(_id);
                            toggleEditOrderModal(true);
                        }}>Редактировать
                        </button>}
                    </div> : null}
                    {role === "courier" && status === "Готов к доставке" ? <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" className="btn btn-success" onClick={() => acceptForDeliveryClick()}>
                            Принять к доставке
                        </button>
                    </div> : (role === "courier" && status === "Доставляется" ? <div className="btn-group" role="group" aria-label="Basic outline example">
                        <button type="button" className="btn btn-success" onClick={() => deliveredClick()}>
                            Заказ доставлен
                        </button>
                    </div> : null)}
                </div>
            </div>
        </>
    );
}

export default CurrentOrder;
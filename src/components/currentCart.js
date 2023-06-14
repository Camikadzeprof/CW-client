import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useActions from "../helpers/hooks/useActions";
import {useSelector} from "react-redux";
import EditCurrentCartItemModal from "../modal/editCurrentCartItemModal";
import DeleteCurrentCartItemModal from "../modal/deleteCurrentCartItemModal";
import AddOrderModal from "../modal/addOrderModal";

const CurrentCart = () => {
    const [showEditCartItemModal, toggleEditCartItemModal] = useState(false);
    const [showDeleteCartItemModal, toggleDeleteCartItemModal] = useState(false);
    const [showAddOrderModal, toggleAddOrderModal] = useState(false);
    const [currentCartItemIdValue, setCurrentCartItemIdValue] = useState(null);
    const redux = useActions();
    const {cartItemId} = useParams();
    const {id} = useSelector(state => state.cart);

    useEffect(() => {
        (async () => {
            fetch(`/cartItem/${cartItemId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(({_id, food, quantity, amount}) => {
                    redux.getCurrentCartItem(_id, food, quantity, amount);
                })
        })()
    }, [])
    const {_id, food, quantity, amount} = useSelector(state => state.cartItem);

    return (
        <>
            {showEditCartItemModal ? <EditCurrentCartItemModal closeCallback={() => toggleEditCartItemModal(false)}
                                                               showEditCartItemModal={showEditCartItemModal}
                                                               id={currentCartItemIdValue}/> : null}
            {showDeleteCartItemModal ?
                <DeleteCurrentCartItemModal closeCallback={() => toggleDeleteCartItemModal(false)} id={currentCartItemIdValue}
                                            showDeleteCartItemModal={showDeleteCartItemModal}/> : null}
            {showAddOrderModal ?
                <AddOrderModal closeCallback={() => toggleAddOrderModal(false)} cartItemId={currentCartItemIdValue}
                                        showAddOrderModal={showAddOrderModal}/> : null}
            <div className="main_content">
                <div className="info">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{food.name}</h5>
                            <img src={food.img} width={200} height={200}/>
                            <p className="card-text">Количество порций: {quantity}</p>
                            <p className="card-text">Сумма: {Number(amount).toFixed(2)} BYN</p>
                        </div>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" className="btn btn-success" onClick={() => {
                            setCurrentCartItemIdValue(_id);
                            toggleAddOrderModal(true);
                        }}>Сделать заказ
                        </button>
                        <button type="button" style={{marginLeft: "5px"}} className="btn btn-success" onClick={() => {
                            setCurrentCartItemIdValue(_id);
                            toggleEditCartItemModal(true);
                        }}>Редактировать
                        </button>
                        <button type="button" style={{marginLeft: "5px"}} className="btn btn-danger" onClick={() => {
                            setCurrentCartItemIdValue(_id);
                            toggleDeleteCartItemModal(true);
                        }}>Удалить
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CurrentCart;
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useActions from "../helpers/hooks/useActions";
import {useSelector} from "react-redux";
import EditCurrentCartModal from "../modal/editCurrentCartModal";
import DeleteCurrentCartModal from "../modal/deleteCurrentCartModal";
import AddOrderModal from "../modal/addOrderModal";

const CurrentCart = () => {
    const [showEditCartModal, toggleEditCartModal] = useState(false);
    const [showDeleteCartModal, toggleDeleteCartModal] = useState(false);
    const [showAddOrderModal, toggleAddOrderModal] = useState(false);
    const [currentCartIdValue, setCurrentCartIdValue] = useState(null);
    const redux = useActions();
    const {cartId} = useParams();
    const {id} = useSelector(state => state.user);

    useEffect(() => {
        (async () => {
            await fetch(`/cart/${cartId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(({_id, food, amount, quantity}) => {
                    redux.getCurrentCart(_id, food, amount, quantity);
                })
        })()
    }, [])
    const {_id, food, amount, quantity} = useSelector(state => state.cart);

    return (
        <>
            {showEditCartModal ? <EditCurrentCartModal closeCallback={() => toggleEditCartModal(false)}
                                                showEditCartModal={showEditCartModal}
                                                id={currentCartIdValue}/> : null}
            {showDeleteCartModal ?
                <DeleteCurrentCartModal closeCallback={() => toggleDeleteCartModal(false)} id={currentCartIdValue}
                                        showDeleteCartModal={showDeleteCartModal}/> : null}
            {showAddOrderModal ?
                <AddOrderModal closeCallback={() => toggleAddOrderModal(false)} cartId={currentCartIdValue}
                                        showAddOrderModal={showAddOrderModal}/> : null}
            <div className="main_content">
                <div className="info">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{food.name}</h5>
                            <p className="card-text">{amount}</p>
                            <p className="card-text">{quantity}</p>
                        </div>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" className="btn btn-success" onClick={() => {
                            setCurrentCartIdValue(_id);
                            toggleAddOrderModal(true);
                        }}>Сделать заказ
                        </button>
                        <button type="button" style={{marginLeft: "5px"}} className="btn btn-success" onClick={() => {
                            setCurrentCartIdValue(_id);
                            toggleEditCartModal(true);
                        }}>Редактировать
                        </button>
                        <button type="button" style={{marginLeft: "5px"}} className="btn btn-danger" onClick={() => {
                            setCurrentCartIdValue(_id);
                            toggleDeleteCartModal(true);
                        }}>Удалить
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CurrentCart;
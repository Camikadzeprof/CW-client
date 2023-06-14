import React, {useEffect, useState} from "react";
import useActions from "../helpers/hooks/useActions";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import AddOrderListModal from "../modal/addOrderListModal";

const Cart = (props) => {
    const redux = useActions();
    const [showAddOrderListModal, toggleAddOrderListModal] = useState(false);
    const {id} = useSelector(state => state.user);
    const token = localStorage.getItem('token');
    useEffect(() => {
        (async () => {
            if (token) {
                fetch(`/cart/user/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(data => data.json())
                    .then(({_id, amount, user}) => {
                        if (_id !== '') {
                            redux.getCart(_id, amount, user);
                            fetch(`/cartItems/cart/${_id}`, {
                                method: 'GET',
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                                .then(data => data.json())
                                .then(cartItems => {
                                    redux.getCartItems(cartItems);
                                })
                        }
                    })
            }
        })()
    }, [])
    async function clear() {
        fetch(`/cart/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(data => data.json())
            .then(({message}) => {
                alert(message);
                redux.clearCart();
                redux.clearCartItems();
            })
    }

    const {_id, amount} = useSelector(state => state.cart);
    const {cartItems} = useSelector(state => state.cartItem)

    return (
        <>
            {showAddOrderListModal ? <AddOrderListModal closeCallback={() => toggleAddOrderListModal(false)}
                                                        showAddOrderListModal={showAddOrderListModal}/> : null}
            <div className="main_content">
                <div className="info">
                    <h2>Корзина</h2>
                    <ul className="list-group">
                        {cartItems && cartItems.map((cartItem, index) => (
                            <li key={index} className="list-group-item">
                                <div id="list-span">
                                    <span id="span_food">{cartItem.food.name}</span>
                                    <span id="span_amount">{cartItem.quantity}</span>
                                    <span id="span_quantity">{Number(cartItem.amount).toFixed(2)} BYN</span>
                                </div>
                                <div className="btn-group" role="group" aria-label="Basic outlined example">
                                    <NavLink to={`/cartItem/${cartItem._id}`} exact
                                             className="btn btn-outline-primary">Показать</NavLink>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {cartItems.length > 0 ? <div className="card">
                        <div className="card-body">
                            <p className="card-text">Итого: {Number(amount).toFixed(2)} BYN</p>
                        </div>
                    </div> : null}
                    {cartItems.length > 0 ? <button type="button" className="btn btn-success" onClick={() => {
                        toggleAddOrderListModal(true);
                    }}>Сделать заказ
                    </button> : <h5>Корзина пуста</h5>
                    }
                    {cartItems.length > 0 ? <button type="button" className="btn btn-danger" onClick={() => clear()}>
                            Очистить корзину
                        </button> :
                        null
                    }
                </div>
            </div>
        </>
    )
}
export default Cart;
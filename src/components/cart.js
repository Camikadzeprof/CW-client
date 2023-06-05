import React, {useEffect, useState} from "react";
import useActions from "../helpers/hooks/useActions";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import AddOrderListModal from "../modal/addOrderListModal";

const Cart = (props) => {
    const redux = useActions();
    const [showAddOrderListModal, toggleAddOrderListModal] = useState(false);
    const [flag, setFlag] = useState(false);
    const {id} = useSelector(state => state.user);
    const token = localStorage.getItem('token');
    useEffect(() => {
        (async () => {
            if (token) {
                fetch(`/carts/user/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(data => data.json())
                    .then(carts => {
                        if (carts.length !== 0) setFlag(true);
                        else setFlag(false);
                        redux.getCarts(carts);
                    })
            }
        })()
    }, [])
    async function clear() {
        fetch(`/carts/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(data => data.json())
            .then(({message}) => {
                alert(message);
                redux.clearCarts();
                setFlag(false);
            })
    }

    const {carts} = useSelector(state => state.cart);

    return (
        <>
            {showAddOrderListModal ? <AddOrderListModal closeCallback={() => toggleAddOrderListModal(false)}
                                                        showAddOrderListModal={showAddOrderListModal}/> : null}
            <div className="main_content">
                <div className="info">
                    <h2>Корзина</h2>
                    <ul className="list-group">
                        {carts && carts.map((cart, index) => (
                            <li key={index} className="list-group-item">
                                <div id="list-span">
                                    <span id="span_food">{cart.food.name}</span>
                                    <span id="span_amount">{cart.amount}</span>
                                    <span id="span_quantity">{cart.quantity} BYN</span>
                                </div>
                                <div className="btn-group" role="group" aria-label="Basic outlined example">
                                    <NavLink to={`/cart/${cart._id}`} exact
                                             className="btn btn-outline-primary">Показать</NavLink>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {carts.length > 0 ? <button type="button" className="btn btn-success" onClick={() => {
                        toggleAddOrderListModal(true);
                    }}>Сделать заказ
                    </button> : <h5>Корзина пуста</h5>
                    }
                    {carts.length > 0 ? <button type="button" className="btn btn-danger" onClick={() => clear()}>
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
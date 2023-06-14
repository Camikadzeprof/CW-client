import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useActions from "../helpers/hooks/useActions";
import {useSelector} from "react-redux";

const CurrentMenu = () => {
    const redux = useActions();
    const {menuId} = useParams();
    const {id} = useSelector(state => state.user);
    const [quantityValue, setQuantityValue] = useState('');
    const sendCartSubmit = async (e) => {
        e.preventDefault();
        if (quantityValue > 0) {
            fetch('/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    amount: 0,
                    user: id
                })
            }).then(data => data.json())
                .then(data => {
                    fetch('/cartItem', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            food: menuId,
                            quantity: quantityValue,
                            amount: quantityValue * price,
                            cart: data.cartId
                        })
                    })
                    alert(data.message);
                    setQuantityValue(1);
                })
                .catch(e => {
                    alert(e.message)
                })
        }
        else {
            alert('Количество блюд должно быть больше нуля');
        }
    }
    useEffect(() => {
        (async () => {
            fetch(`/menu/${menuId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(({_id, name, type, img, description, price}) => {
                    redux.getCurrentMenu(_id, name, type, img, description, price);
                    setQuantityValue(1);
                })
        })()
    }, [])
    const {_id, name, type, img, description, price} = useSelector(state => state.menu);

    return (
        <>
            <div className="main_content">
                <div className="info">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <img src={img} width={200} height={200}/>
                            <p className="card-text">Описание: {description}</p>
                            <p className="card-text">Цена: {Number(price).toFixed(2)} BYN</p>

                        </div>
                    </div>
                    <form onSubmit={sendCartSubmit}>
                        <div className="mb-3">
                            <label htmlFor="amountInput" className="form-label">Выберите количество</label>
                            <input type="number" className="form-control" id="amountInput" value={quantityValue}
                                   onChange={e => setQuantityValue(e.target.value)}/>
                        </div>
                        <input type="submit" className='btn btn-success' value="Добавить в корзину"/>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CurrentMenu;
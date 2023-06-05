import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useActions from "../helpers/hooks/useActions";
import {useSelector} from "react-redux";

const CurrentMenu = () => {
    const redux = useActions();
    const {menuId} = useParams();
    const {id} = useSelector(state => state.user);
    const [amountValue, setAmountValue] = useState('');
    const sendCartSubmit = async (e) => {
        e.preventDefault();
        if (amountValue > 0) {
            fetch('/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    food: menuId,
                    amount: amountValue,
                    user: id
                })
            }).then(data => data.json())
                .then(({message}) => {
                    alert(message);
                    setAmountValue(1);
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
                    setAmountValue(1);
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
                            <p className="card-text">{description}</p>
                            <p className="card-text">{price} BYN</p>

                        </div>
                    </div>
                    <form onSubmit={sendCartSubmit}>
                        <div className="mb-3">
                            <label htmlFor="amountInput" className="form-label">Выберите количество</label>
                            <input type="number" className="form-control" id="amountInput" value={amountValue}
                                   onChange={e => setAmountValue(e.target.value)}/>
                        </div>
                        <input type="submit" className='btn btn-success' value="Добавить в корзину"/>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CurrentMenu;
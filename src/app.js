import React, {useEffect, useState} from "react";
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Sidebar from "./components/sidebar";
import Home from './components/home'
import './css/app.css'
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import useActions from "./helpers/hooks/useActions";
import Chat from "./components/chat";
import socket from "./components/socket"
import {useSelector} from "react-redux";
import Type from "./components/type";
import Cart from "./components/cart";
import Order from "./components/order";
import AdminPanel from "./components/admin/adminPanel";
import CurrentType from "./components/currentType";
import CurrentCart from "./components/currentCart";
import CurrentOrder from "./components/currentOrder";
import Profile from "./components/profile";
import LoginModal from "./modal/loginModal";
import CurrentMenu from "./components/currentMenu";
import Error from "./components/error";
import Payment from "./components/payment";

function App() {
    //TODO: work with images
    //TODO: do home
    let {id, username, role} = useSelector(state => state.user);
    let User;
    const redux = useActions();
    const setMessage = (obj) => redux.setMessage(obj);
    const setUsers = (users) => redux.setSocket(users);
    const [showLogInModal, toggleLogInModal] = useState(false);
    const [currentUserIdValue, setCurrentUserIdValue] = useState('');
    const preload = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            console.warn("Check token request")
            fetch('/init', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(r => r.json())
                .then(user => {
                    User = user;
                    redux.authUser(user.id, user.username, user.role, token, true);
                    setCurrentUserIdValue(user.id);
                    socket.emit('JOIN', {username: user.username});
                })
                .catch((e) => {
                    localStorage.removeItem('token');
                    socket.disconnect();
                    alert('Ваща сессия истекла. Войдите в аккаунт заново.');
                    toggleLogInModal(true);
                })
        } else console.warn("Check request is passed")
    }

    useEffect(() => {
        preload();
        socket.on("SET_USERS", setUsers);
        socket.on("NEW_MESSAGE", setMessage);
    }, [])


    const closeModal = () => {
        console.log('close')
        toggleLogInModal(false);
        console.log(showLogInModal);
    }

    const stripePromise = loadStripe("pk_test_51N8mqbLjk9pqEiZIrDRr8TmQVqaEQrTF9NrEnlSFD08hg1LfpkhkFZYhLVQIvXZMcfzYBiD2JiRVmvEkPumxNJGz00W9CJBKL7");

    return (
        <BrowserRouter>
            <div className="App">
                {showLogInModal ? (<LoginModal closeCallback={closeModal}/>) : null}
                <Sidebar/>
                <Switch>
                    <Route path="/" exact>
                        <Home/>
                    </Route>
                    <Route path="/admin" exact>
                        {id !== null ? (role == 'admin' ? <AdminPanel/> : <Error statusCode={'401'} statusMessage={'Неавторизован'} message={'Вы должны быть администратором, чтобы просматривать данный раздел'}/>) : <Error statusCode={'401'} statusMessage={'Неавторизован'} message={'Вы должны войти в свой аккаунт, чтобы просматривать данный раздел'}/>}
                    </Route>
                    <Route path="/profile/:id" exact>
                        {id !== null ? <Profile/> : <Error statusCode={'401'} statusMessage={'Неавторизован'} message={'Вы должны войти в свой аккаунт, чтобы просматривать профиль'}/>}
                    </Route>
                    <Route path="/type" exact>
                        <Type/>
                    </Route>
                    <Route path="/cart" exact>
                        {!!username ? <Cart/> : <Error statusCode={'401'} statusMessage={'Неавторизован'} message={'Вы должны войти в свой аккаунт, чтобы работать с корзиной'}/>}
                    </Route>
                    <Route path="/cartItem/:cartItemId" exact>
                        {!!username ? <CurrentCart/> : <Error statusCode={'401'} statusMessage={'Неавторизован'} message={'Вы должны войти в свой аккаунт, чтобы работать с корзиной'}/>}
                    </Route>
                    <Route path="/order" exact>
                        {!!username ? <Order/> : <Error statusCode={'401'} statusMessage={'Неавторизован'} message={'Вы должны войти в свой аккаунт, чтобы работать с заказами'}/>}
                    </Route>
                    <Route path="/order/user/:userId" exact>
                        {!!username ? <Order/> : <Error statusCode={'401'} statusMessage={'Неавторизован'} message={'Вы должны войти в свой аккаунт, чтобы работать с заказами'}/>}
                    </Route>
                    <Route path="/order/:orderId" exact>
                        {!!username ? <CurrentOrder/> : <Error statusCode={'401'} statusMessage={'Неавторизован'} message={'Вы должны войти в свой аккаунт, чтобы работать с заказами'}/>}
                    </Route>
                    <Route path="/chat" exact>
                        {!!username ? <Chat onSetMessage={setMessage}/> : <Error statusCode={'401'} statusMessage={'Неавторизован'} message={'Вы должны войти в свой аккаунт, чтобы пользоваться чатом'}/>}
                    </Route>
                    <Route path="/type/:typeName" exact>
                        <CurrentType/>
                    </Route>
                    <Route path="/type/:typeName/:menuId" exact>
                        {!!username ? <CurrentMenu/> : <Error statusCode={'401'} statusMessage={'Неавторизован'} message={'Вы должны войти в свой аккаунт, чтобы просматривать блюдо'}/>}
                    </Route>
                    <Route path="/payment/:amount/:orderId" exact>
                        {!!username ?
                            <Elements stripe={stripePromise}>
                                <Payment/>
                            </Elements>
                            : <Error statusCode={'401'} statusMessage={'Неавторизован'} message={'Вы должны войти в свой аккаунт, чтобы платить за заказы'}/>}
                    </Route>
                    <Route path="/error">
                        <Error statusCode={'404'} statusMessage={'Не найдено'} message={'Страница не найдена'}/>
                    </Route>
                    <Redirect to="/error"/>
                </Switch>
            </div>
        </BrowserRouter>

    );
}


export default App;
import React, {useEffect, useState} from "react";
import '../../css/adminPanel.css'
import useActions from "../../helpers/hooks/useActions";
import {useSelector} from "react-redux";
import AddTypeModal from "../../modal/admin/addTypeModal";
import AddMenuModal from "../../modal/admin/addMenuModal";
import ShowUserModal from "../../modal/admin/showUserModal";
import DeleteUserModal from "../../modal/admin/deleteUserModal";
import EditTypeModal from "../../modal/admin/editTypeModal";
import DeleteTypeModal from "../../modal/admin/deleteTypeModal";
import EditMenuModal from "../../modal/admin/editMenuModal";
import DeleteMenuModal from "../../modal/admin/deleteMenuModal";

const AdminPanel = (props) => {
    const redux = useActions();
    const [showDeleteUserModal, toggleDeleteUserModal] = useState(false);
    const [showAddTypeModal, toggleAddTypeModal] = useState(false);
    const [showAddMenuModal, toggleAddMenuModal] = useState(false);
    const [showShowUserModal, toggleShowUserModal] = useState(false);
    const [showEditTypeModal, toggleEditTypeModal] = useState(false);
    const [showEditMenuModal, toggleEditMenuModal] = useState(false);
    const [showDeleteTypeModal, toggleDeleteTypeModal] = useState(false);
    const [showDeleteMenuModal, toggleDeleteMenuModal] = useState(false);
    const [currentUserIdValue, setCurrentUserIdValue] = useState('');
    const [currentTypeNameValue, setCurrentTypeNameValue] = useState('');
    const [currentMenuIdValue, setCurrentMenuIdValue] = useState('');
    const [currentOrderIdValue, setCurrentOrderIdValue] = useState(null);
    useEffect(() => {
        (async () => {
            fetch('/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(users => {
                    redux.getAllUsers(users);
                })
        })();
        (async () => {
            fetch('/type', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(types => {
                    redux.getTypes(types);
                })
                .catch(e => {
                    console.log(e.message)
                })
        })();
        (async () => {
            fetch('/menu', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(menus => {
                    redux.getMenu(menus);
                })
                .catch(e => {
                    console.log(e.message)
                })
        })();
    }, [])
    const {users} = useSelector(state => state.user);
    const {types} = useSelector(state => state.type);
    const {menus} = useSelector(state => state.menu);
    return (
        <>
            {showDeleteUserModal ? <DeleteUserModal closeCallback={() => toggleDeleteUserModal(false)}
                                                    showDeleteUserModal={showDeleteUserModal}
                                                    userId={currentUserIdValue}/> : null}
            {showShowUserModal ?
                <ShowUserModal closeCallback={() => toggleShowUserModal(false)} userId={currentUserIdValue}/> : null}
            {showAddTypeModal ? <AddTypeModal closeCallback={() => toggleAddTypeModal(false)}
                                                showAddTypeModal={showAddTypeModal}/> : null}
            {showEditTypeModal ? <EditTypeModal closeCallback={() => toggleEditTypeModal(false)}
                                                  showEditTypeModal={showEditTypeModal}
                                                  typeName={currentTypeNameValue}/> : null}
            {showDeleteTypeModal ?
                <DeleteTypeModal closeCallback={() => toggleDeleteTypeModal(false)} typeName={currentTypeNameValue}
                                  showDeleteTypeModal={showDeleteTypeModal}/> : null}
            {showAddMenuModal ? <AddMenuModal closeCallback={() => toggleAddMenuModal(false)}
                                              showAddMenuModal={showAddMenuModal}/> : null}
            {showEditMenuModal ? <EditMenuModal closeCallback={() => toggleEditMenuModal(false)}
                                                showEditMenuModal={showEditMenuModal}
                                                id={currentMenuIdValue}/> : null}
            {showDeleteMenuModal ?
                <DeleteMenuModal closeCallback={() => toggleDeleteMenuModal(false)} id={currentMenuIdValue}
                                 showDeleteMenuModal={showDeleteMenuModal}/> : null}
            <div className="main_content">
                <div className="info">
                    <div>
                        <button type="button" className="btn btn-primary" onClick={() => toggleAddTypeModal(true)}>
                            Добавить тип блюда
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary" onClick={() => toggleAddMenuModal(true)}>
                            Добавить блюдо
                        </button>
                    </div>
                    <h2>Пользователи</h2>
                    <ul className="list-group">
                        {users && users.map((user, index) => (
                            <li key={index} className="list-group-item">
                                <div id="list-span">
                                    <span id="span_username">{user.username}</span>
                                    <span id="span_email">{user.email}</span>
                                    <span id="span_phone">{user.phone}</span>
                                </div>
                                <div className="btn-group" role="group" aria-label="Basic outlined example">
                                    <button type="button" className="btn btn-outline-primary" onClick={() => {
                                        setCurrentUserIdValue(user._id);
                                        toggleShowUserModal(true);
                                    }}>Показать
                                    </button>
                                    {user.role === 'admin' ? null :
                                        <button type="button" className="btn btn-danger" onClick={() => {
                                            setCurrentUserIdValue(user._id);
                                            toggleDeleteUserModal(true);
                                        }}>Удалить
                                        </button>}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h2>Типы блюд</h2>
                    <ul className="list-group">
                        {types && types.map((type, index) => (
                            <li key={index} className="list-group-item">
                                <div id="list-span">
                                    <span id="span_typename">{type.name}</span>
                                </div>
                                <div className="btn-group" role="group" aria-label="Basic outlined example">
                                    <button type="button" className="btn btn-outline-primary" onClick={() => {
                                        setCurrentTypeNameValue(type.name);
                                        toggleEditTypeModal(true);
                                    }}>Редактировать
                                    </button>
                                    <button className="btn btn-danger" type="button" onClick={() => {
                                        setCurrentTypeNameValue(type.name);
                                        toggleDeleteTypeModal(true);
                                    }}>
                                        Удалить
                                    </button>

                                </div>
                            </li>
                        ))}
                    </ul>
                    <h2>Блюда</h2>
                    <ul className="list-group">
                        {menus && menus.map((menu, index) => (
                            <li key={index} className="list-group-item">
                                <div id="list-span">
                                    <img src={menu.img} width={50} height={50}/>
                                </div>
                                <div id="list-span">
                                    <span id="span_foodname">{menu.name}</span>
                                </div>
                                <div id="list-span">
                                    <span id="span_description">{menu.description}</span>
                                </div>
                                <div id="list-span">
                                    <span id="span_price">{menu.price} BYN</span>
                                </div>
                                <div className="btn-group" role="group" aria-label="Basic outlined example">
                                    <button type="button" className="btn btn-outline-primary" onClick={() => {
                                        setCurrentMenuIdValue(menu._id);
                                        toggleEditMenuModal(true);
                                    }}>Редактировать
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={() => {
                                        setCurrentMenuIdValue(menu._id);
                                        toggleDeleteMenuModal(true);
                                    }}>Удалить
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
export default AdminPanel;
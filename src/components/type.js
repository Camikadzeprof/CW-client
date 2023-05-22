import React, {useEffect} from "react";
import useActions from "../helpers/hooks/useActions";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

const Type = (props) => {
    const redux = useActions();
    const token = localStorage.getItem('token');
    useEffect(() => {
        (async () => {
            if (token) {
                await fetch('/type', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(data => data.json())
                    .then(types => {
                        redux.getTypes(types);
                    })
            }
        })()
    }, [])
    const {types} = useSelector(state => state.type);

    return (
        <div className="main_content">
            <div className="info">
                <h2>Типы блюд</h2>
                <ul className="list-group">
                    {types && types.map((type, index) => (
                        <li key={index} className="list-group-item">
                            <div id="list-span">
                                <span id="span_username">{type.name}</span>
                            </div>
                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                                <NavLink to={`/type/${type.name}`} exact
                                         className="btn btn-outline-primary">Показать</NavLink>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Type;
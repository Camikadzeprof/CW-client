import {NavLink, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useActions from "../helpers/hooks/useActions";
import {useSelector} from "react-redux";

const CurrentType = () => {
    const {typeName} = useParams();
    const {role} = useSelector(state => state.user);
    const redux = useActions();
    useEffect(() => {
        (async () => {
                await fetch(`/type/${typeName}`, {
                    method: 'GET'
                })
                    .then(data => data.json())
                    .then(({_id, name}) => {
                        redux.getCurrentType(_id, name);
                        fetch(`/menu/type/${name}`, {
                            method: 'GET'
                        }).then(data => data.json())
                            .then((menus) => {
                                redux.getMenu(menus);
                            })
                    })
            }
        )()
    }, [])

    const {menus} = useSelector(state => state.menu);

    return (
        <>
            <div className="main_content">
                <div className="info">
                    <h4>{typeName}</h4>
                    {!!menus ? (
                        <>
                            {menus.map(({_id, name, type, img, description, price}, index) => (
                                <div className="card mb-3" key={index}>
                                    <div className="card-body">
                                        <h5 className="card-title">{name}</h5>
                                        <p><img src={img} width={200} height={200}/></p>
                                        <p className="card-text">{description}</p>
                                        <p className="card-text">{price} BYN</p>
                                        {!role || role !== "user" ? null :
                                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                                            <NavLink to={`${typeName}/${_id}`} exact
                                                     className="btn btn-outline-primary">Показать</NavLink>
                                        </div>}
                                    </div>
                                </div>
                            ))}

                        </>
                    ) : null}
                </div>
            </div>
        </>
    )
}
export default CurrentType;
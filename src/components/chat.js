import socket from "./socket";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import '../css/chat.css';
import useActions from "../helpers/hooks/useActions";

const Chat = ({onSetMessage}) => {
    const redux = useActions();
    const messagesRef = useRef(null);
    const {username, role} = useSelector(state => state.user);
    const {users, messages} = useSelector(state => state.chatData);
    const [messageValue, setMessageValue] = useState('');
    useEffect(() => {
        socket.connect();
        messagesRef.current.scrollTo(0, 9999);
        socket.on("SOCKET_DATA", data => {
            redux.setChatData(data);
        })
    }, [messages]);
    const onSendMessage = () => {
        socket.emit("NEW_MESSAGE", {
            username: username + '(' + role + ')',
            message: messageValue
        })
        onSetMessage({username: username, message: messageValue});
        setMessageValue('');
        socket.on("SOCKET_DATA", data => {
            redux.setChatData(data);
        })
    }

    return (
        <div className="main_content">
            <div className="info">
                <main>
                    <ul id="chat" ref={messagesRef}>
                        {messages.map((message, index) => (
                            <li key={index} className="me">
                                <div className="message">
                                    {message.message}
                                </div>
                                <div>{message.username}</div>
                            </li>
                        ))}
                    </ul>
                    <footer>
                        <textarea placeholder="Напишите своё сообщение" value={messageValue}
                                  onChange={(e) => setMessageValue(e.target.value)}/>
                        <button onClick={onSendMessage} type="button">Отправить</button>
                    </footer>
                </main>

            </div>
        </div>
    )
}

export default Chat;
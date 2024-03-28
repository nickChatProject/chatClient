import Message from "./Message";
import {useContext, useEffect, useState} from "react";
import {ChatContext} from "../context/ChatContext";
import axios from "axios";
import {useWebSocket} from "../context/WebSocketContext";

const Messages = (props) => {
    //const [messages, setMessages] = useState([]);
    //const { setMessages, messages } = useWebSocket();
    const { currentFriend } = useContext(ChatContext);

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + "chat_history/"
        const friendID = {
            "receiver_id": currentFriend.id
        }
        axios.post(url, friendID, {
            headers:{"Authorization": localStorage.getItem("token")}
        }).then(res=> {
            props.setMessages(res.data)
        }).catch(err=> {
            console.error('Error fetching data:', err);
        })


    }, [currentFriend.id]);

    console.log(props.messages)

    return (
        <div className="messages">
            {props.messages.map((m) => (
                <Message message={m} key={m.id} />
            ))}
        </div>
    );
}

export default Messages
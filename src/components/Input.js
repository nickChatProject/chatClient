import Img from "../img/img.png";
import Attach from "../img/attach.png";
import {useContext, useState} from "react";
import {ChatContext} from "../context/ChatContext";
import {useWebSocket} from "../context/WebSocketContext";
import { v4 as uuidv4 } from 'uuid';
const Input = (props) => {
    const [text, setText] = useState("");
    const { currentFriend } = useContext(ChatContext);
    const { ws } = useWebSocket();

    const handleSend = () =>{
        const sendMessage = {
            "type": "message",
            "sender_id": parseInt(localStorage.getItem("id")),
            "receiver_id": currentFriend.id,
            "content": text
        }
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(sendMessage));
            const message = {
                "id": uuidv4(),
                "sender_id": parseInt(localStorage.getItem("id")),
                "receiver_id": currentFriend.id,
                "content": text
            }
            props.setMessages([
                ...props.messages,
                message
            ]);
        } else {
            console.error('WebSocket not connected.');
        }
        setText("");
        window.location.reload();
    }
    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type something..."
                onChange={(e) => setText(e.target.value)}
                value={text}

            />
            <div className="send">
                <img src={Attach} alt=""/>
                <input
                    type="file"
                    style={{display: "none"}}
                    id="file"

                />
                <label htmlFor="file">
                    <img src={Img} alt=""/>
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default Input